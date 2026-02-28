import type { InvoiceStatus } from "@/lib/types/invoice";

/**
 * 숫자를 한국 원화 형식으로 포맷팅
 * @param amount - 포맷팅할 금액
 * @returns 한국어 통화 형식 문자열 (예: 5,000,000원)
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

/**
 * 날짜를 한국 형식으로 포맷팅
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 한국어 날짜 형식 문자열 (예: 2026년 2월 27일)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "미지정";
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 견적서 상태별 배지 스타일 반환
 * @param status - 견적서 상태 (draft | issued | paid | cancelled)
 * @returns shadcn/ui Badge 컴포넌트의 variant 값
 */
export function getStatusBadgeVariant(
  status: InvoiceStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "draft":
      return "secondary"; // 회색
    case "issued":
      return "default"; // 파란색 (기본)
    case "paid":
      return "outline"; // 초록색 (outline을 커스텀으로 사용)
    case "cancelled":
      return "destructive"; // 빨간색
  }
}

/**
 * 견적서 상태를 한국어로 변환
 * @param status - 견적서 상태 (draft | issued | paid | cancelled)
 * @returns 한국어 상태 레이블
 */
export function getStatusLabel(status: InvoiceStatus): string {
  switch (status) {
    case "draft":
      return "임시저장";
    case "issued":
      return "발행됨";
    case "paid":
      return "결제완료";
    case "cancelled":
      return "취소됨";
  }
}
