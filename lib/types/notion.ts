/**
 * Notion API 응답 타입 정의
 * Notion 데이터베이스에서 견적서 데이터를 가져올 때 사용
 */

/**
 * Notion 속성 값 타입 (Union Type)
 */
export type NotionPropertyValue =
  | { type: "title"; title: Array<{ plain_text: string }> }
  | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
  | { type: "number"; number: number }
  | { type: "date"; date: { start: string } }
  | { type: "select"; select: { name: string } }
  | { type: "relation"; relation: Array<{ id: string }> };

/**
 * Notion 페이지 응답
 */
export interface NotionPageResponse {
  /** 페이지 ID */
  id: string;
  /** 페이지 속성 (key: 속성명, value: 속성 값) */
  properties: Record<string, NotionPropertyValue>;
}

/**
 * Notion 데이터베이스 쿼리 응답
 */
export interface NotionDatabaseQueryResponse {
  /** 결과 페이지 목록 */
  results: NotionPageResponse[];
  /** 추가 결과 존재 여부 (페이지네이션) */
  has_more: boolean;
  /** 다음 페이지 커서 (페이지네이션) */
  next_cursor?: string | null;
}
