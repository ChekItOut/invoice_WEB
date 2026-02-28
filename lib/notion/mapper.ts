/**
 * Notion 응답 데이터를 애플리케이션 타입으로 변환하는 매퍼
 * Notion API 응답의 복잡한 구조를 단순한 Invoice 타입으로 변환
 */

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  Invoice,
  InvoiceItem,
  InvoiceStatus,
  Party,
} from "@/lib/types/invoice";

// --- 속성 추출 헬퍼 함수 ---

/**
 * Notion 속성에서 타이틀(제목) 텍스트를 추출합니다.
 */
function extractTitle(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title.map((t) => t.plain_text).join("");
  }
  return "";
}

/**
 * Notion 속성에서 리치 텍스트를 추출합니다.
 */
function extractRichText(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

/**
 * Notion 속성에서 숫자를 추출합니다.
 */
function extractNumber(
  properties: PageObjectResponse["properties"],
  key: string
): number {
  const prop = properties[key];
  if (prop?.type === "number" && prop.number !== null) {
    return prop.number;
  }
  return 0;
}

/**
 * Notion 속성에서 날짜 문자열을 추출합니다.
 */
function extractDate(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "date" && prop.date !== null) {
    return prop.date.start;
  }
  return "";
}

/**
 * Notion 속성에서 선택(Select) 값을 추출합니다.
 */
function extractSelect(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "select" && prop.select !== null) {
    return prop.select.name;
  }
  return "";
}

/**
 * Notion 속성에서 관계(Relation) ID 배열을 추출합니다.
 */
function extractRelationIds(
  properties: PageObjectResponse["properties"],
  key: string
): string[] {
  const prop = properties[key];
  if (prop?.type === "relation") {
    return prop.relation.map((r) => r.id);
  }
  return [];
}

/**
 * Notion 속성에서 이메일을 추출합니다.
 */
function extractEmail(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "email" && prop.email !== null) {
    return prop.email;
  }
  return "";
}

/**
 * Notion 속성에서 전화번호를 추출합니다.
 */
function extractPhoneNumber(
  properties: PageObjectResponse["properties"],
  key: string
): string {
  const prop = properties[key];
  if (prop?.type === "phone_number" && prop.phone_number !== null) {
    return prop.phone_number;
  }
  return "";
}

// --- Notion 상태 → InvoiceStatus 매핑 ---

/** Notion 상태값과 InvoiceStatus의 매핑 테이블 */
const STATUS_MAP: Record<string, InvoiceStatus> = {
  임시저장: "draft",
  draft: "draft",
  발행됨: "issued",
  issued: "issued",
  결제완료: "paid",
  paid: "paid",
  취소됨: "cancelled",
  cancelled: "cancelled",
};

/**
 * Notion 상태 문자열을 InvoiceStatus로 변환합니다.
 * 매핑되지 않는 값은 "draft"로 기본 처리합니다.
 */
function mapStatus(notionStatus: string): InvoiceStatus {
  return STATUS_MAP[notionStatus] ?? "draft";
}

// --- 메인 매퍼 함수 ---

/**
 * Notion 페이지 응답을 Invoice 타입으로 변환합니다.
 * items는 별도 조회 후 setInvoiceItems()로 설정해야 합니다.
 *
 * Notion 속성명 매핑:
 * - "견적서 번호" (title) → invoiceNumber
 * - "발행일" (date) → issueDate
 * - "만료일" (date) → dueDate
 * - "상태" (select) → status
 * - "총 금액" (number) → totalAmount
 * - "소계" (number) → subtotal
 * - "부가세" (number) → tax
 * - "비고" (rich_text) → notes
 * - "발행자" (rich_text) → issuer.name
 * - "발행자 이메일" (email) → issuer.email
 * - "발행자 전화번호" (phone_number) → issuer.phone
 * - "발행자 주소" (rich_text) → issuer.address
 * - "수신자" (rich_text) → recipient.name
 * - "수신자 이메일" (email) → recipient.email
 * - "수신자 전화번호" (phone_number) → recipient.phone
 * - "수신자 주소" (rich_text) → recipient.address
 * - "항목" (relation) → items (별도 조회 필요)
 */
export function mapNotionPageToInvoice(
  page: PageObjectResponse
): { invoice: Invoice; itemRelationIds: string[] } {
  const props = page.properties;

  // 발행자 정보 구성
  const issuer: Party = {
    name: extractRichText(props, "발행자") || "발행자 미지정",
    email: extractEmail(props, "발행자 이메일") || extractRichText(props, "발행자 이메일") || undefined,
    phone: extractPhoneNumber(props, "발행자 전화번호") || extractRichText(props, "발행자 전화번호") || undefined,
    address: extractRichText(props, "발행자 주소") || undefined,
  };

  // 수신자 정보 구성
  const recipient: Party = {
    name: extractRichText(props, "수신자") || "수신자 미지정",
    email: extractEmail(props, "수신자 이메일") || extractRichText(props, "수신자 이메일") || undefined,
    phone: extractPhoneNumber(props, "수신자 전화번호") || extractRichText(props, "수신자 전화번호") || undefined,
    address: extractRichText(props, "수신자 주소") || undefined,
  };

  // 관계(Relation) 항목 ID 추출
  const itemRelationIds = extractRelationIds(props, "항목");

  // 금액 정보
  const subtotal = extractNumber(props, "소계") || undefined;
  const tax = extractNumber(props, "부가세") || undefined;
  const totalAmount = extractNumber(props, "총 금액");

  const invoice: Invoice = {
    id: page.id,
    invoiceNumber: extractTitle(props, "견적서 번호"),
    issueDate: extractDate(props, "발행일"),
    dueDate: extractDate(props, "만료일"),
    status: mapStatus(extractSelect(props, "상태")),
    issuer,
    recipient,
    items: [], // 별도 조회 후 설정
    subtotal,
    tax,
    totalAmount,
    notes: extractRichText(props, "비고") || undefined,
  };

  return { invoice, itemRelationIds };
}

/**
 * Notion 항목 페이지 배열을 InvoiceItem 배열로 변환합니다.
 *
 * Notion 항목 속성명 매핑:
 * - "품목명" (title) → name
 * - "수량" (number) → quantity
 * - "단가" (number) → unitPrice
 * - "금액" (number) → amount (또는 수량 * 단가로 계산)
 * - "설명" (rich_text) → description
 * - "카테고리" (select) → category
 */
export function mapNotionItemsToInvoiceItems(
  pages: PageObjectResponse[]
): InvoiceItem[] {
  return pages.map((page) => {
    const props = page.properties;

    const quantity = extractNumber(props, "수량");
    const unitPrice = extractNumber(props, "단가");
    // 금액이 Notion에 있으면 사용, 없으면 수량 * 단가로 계산
    const amount = extractNumber(props, "금액") || quantity * unitPrice;

    return {
      id: page.id,
      name: extractTitle(props, "품목명"),
      quantity,
      unitPrice,
      amount,
      description: extractRichText(props, "설명") || undefined,
      category: extractSelect(props, "카테고리") || undefined,
    };
  });
}
