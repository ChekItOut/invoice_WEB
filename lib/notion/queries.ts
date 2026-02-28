/**
 * Notion API 쿼리 함수
 * 견적서 페이지 및 항목 데이터를 조회하는 함수 모음
 */

import { isNotionClientError, APIErrorCode } from "@notionhq/client";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getNotionClient } from "./client";

/** Notion API 에러 응답 타입 */
export class NotionQueryError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "NotionQueryError";
  }
}

/**
 * 응답이 전체 페이지 객체인지 확인하는 타입 가드
 */
function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

/**
 * Notion 페이지 ID로 견적서 데이터를 조회합니다.
 * @param pageId - Notion 페이지 ID (하이픈 포함/미포함 모두 가능)
 * @returns 견적서 페이지 데이터 (PageObjectResponse)
 * @throws NotionQueryError - 페이지를 찾을 수 없거나 API 오류 발생 시
 */
export async function getInvoicePage(
  pageId: string
): Promise<PageObjectResponse> {
  const notion = getNotionClient();

  try {
    const response = await notion.pages.retrieve({ page_id: pageId });

    if (!isFullPage(response)) {
      throw new NotionQueryError(
        "견적서 페이지의 전체 데이터를 가져올 수 없습니다. " +
          "Integration에 해당 페이지 접근 권한이 있는지 확인해주세요.",
        "PARTIAL_PAGE"
      );
    }

    return response;
  } catch (error) {
    if (error instanceof NotionQueryError) {
      throw error;
    }

    if (isNotionClientError(error)) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        throw new NotionQueryError(
          "견적서를 찾을 수 없습니다.",
          "NOT_FOUND",
          404
        );
      }
      if (error.code === APIErrorCode.Unauthorized) {
        throw new NotionQueryError(
          "Notion API 인증에 실패했습니다. API 키를 확인해주세요.",
          "UNAUTHORIZED",
          401
        );
      }
      if (error.code === APIErrorCode.RateLimited) {
        throw new NotionQueryError(
          "API 요청 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요.",
          "RATE_LIMITED",
          429
        );
      }
      throw new NotionQueryError(
        `Notion API 오류: ${error.message}`,
        error.code,
        500
      );
    }

    throw new NotionQueryError(
      "알 수 없는 오류가 발생했습니다.",
      "UNKNOWN",
      500
    );
  }
}

/**
 * Relation으로 연결된 견적 항목(Items) 페이지들을 일괄 조회합니다.
 * @param relationIds - 항목 페이지 ID 배열
 * @returns 항목 페이지 데이터 배열
 */
export async function getInvoiceItems(
  relationIds: string[]
): Promise<PageObjectResponse[]> {
  if (relationIds.length === 0) {
    return [];
  }

  const notion = getNotionClient();
  const items: PageObjectResponse[] = [];

  // 병렬로 각 항목 페이지를 조회 (Notion API rate limit 고려하여 최대 10개씩)
  const batchSize = 10;
  for (let i = 0; i < relationIds.length; i += batchSize) {
    const batch = relationIds.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (id) => {
        try {
          const response = await notion.pages.retrieve({ page_id: id });
          if (isFullPage(response)) {
            return response;
          }
          return null;
        } catch (error) {
          // 개별 항목 조회 실패 시 건너뛰기 (로그만 남김)
          console.error(`항목 조회 실패 (ID: ${id}):`, error);
          return null;
        }
      })
    );

    // null이 아닌 결과만 추가
    items.push(
      ...batchResults.filter((item): item is PageObjectResponse => item !== null)
    );
  }

  return items;
}
