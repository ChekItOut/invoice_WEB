# Notion API Expert - 프로젝트 메모리

## 프로젝트 구조
- **프레임워크**: Next.js 16 App Router + TypeScript
- **Notion 클라이언트**: `@notionhq/client` v5.9.0
- **경로 별칭**: `@/` = 프로젝트 루트

## Notion 모듈 구조
- `lib/notion/client.ts` - 싱글톤 Notion 클라이언트 (NOTION_API_KEY 환경변수)
- `lib/notion/queries.ts` - 페이지/항목 조회 함수 (getInvoicePage, getInvoiceItems, getInvoiceList)
- `lib/notion/mapper.ts` - Notion 응답 → Invoice 타입 변환
- `lib/notion/index.ts` - re-export 진입점

## Notion DB 속성명 매핑 (한국어)
### 견적서(Invoices) DB
- "견적서 번호" (title) → invoiceNumber
- "발행일"/"만료일" (date) → issueDate/dueDate
- "상태" (select) → status (임시저장/발행됨/결제완료/취소됨)
- "총 금액"/"소계"/"부가세" (number)
- "발행자"/"수신자" (rich_text) → issuer.name/recipient.name
- "발행자 이메일"/"수신자 이메일" (email 또는 rich_text)
- "발행자 전화번호"/"수신자 전화번호" (phone_number 또는 rich_text)
- "발행자 주소"/"수신자 주소" (rich_text)
- "항목" (relation) → items (Items DB 참조)
- "비고" (rich_text)

### 항목(Items) DB
- "품목명" (title) → name
- "수량"/"단가"/"금액" (number)
- "설명" (rich_text), "카테고리" (select)

## 타입 정의
- `lib/types/invoice.ts` - Invoice, InvoiceItem, Party, InvoiceStatus
- `lib/types/notion.ts` - NotionPropertyValue, NotionPageResponse (커스텀 타입, 실제 쿼리에서는 공식 SDK 타입 사용)

## 환경 변수
- `NOTION_API_KEY` - Notion Integration 토큰
- `NOTION_DATABASE_ID` - 견적서 DB ID (현재 미사용, 향후 목록 조회용)
- 설정 파일: `.env.local` (`.env.example` 참조)

## 주의사항
- Next.js 16에서 `params`는 `Promise<{ id: string }>` 타입 (async/await 필요)
- Notion API rate limit: 배치 조회 시 10개씩 분할 처리
- email/phone_number 속성은 Notion DB 설정에 따라 rich_text일 수도 있어 fallback 처리
- **v5.9.0 Breaking Change**: `databases.query()` 제거됨 → `dataSources.query()` 사용 (파라미터: `data_source_id`)
- `dataSources.query()` results에는 DataSourceObjectResponse도 포함되므로 `result.object === "page"` 체크 필요
