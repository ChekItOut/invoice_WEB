/**
 * Notion API 클라이언트 초기화
 * 싱글톤 패턴으로 애플리케이션 전체에서 하나의 인스턴스만 사용
 */

import { Client } from "@notionhq/client";

/** Notion 클라이언트 싱글톤 인스턴스 */
let notionClient: Client | null = null;

/**
 * Notion 클라이언트 인스턴스를 반환합니다.
 * 환경 변수 NOTION_API_KEY가 설정되어 있어야 합니다.
 * @throws NOTION_API_KEY가 설정되지 않은 경우 에러 발생
 */
export function getNotionClient(): Client {
  if (notionClient) {
    return notionClient;
  }

  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NOTION_API_KEY 환경 변수가 설정되지 않았습니다. " +
        ".env.local 파일에 NOTION_API_KEY를 추가해주세요."
    );
  }

  notionClient = new Client({
    auth: apiKey,
  });

  return notionClient;
}
