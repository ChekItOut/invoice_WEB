/**
 * 견적서 시스템 핵심 타입 정의
 * 타입 정의 순서: 기본 타입 → 의존성 타입 → 최상위 타입 (순환 참조 방지)
 */

/**
 * 견적서 상태
 * - draft: 임시저장
 * - issued: 발행됨
 * - paid: 결제완료
 * - cancelled: 취소됨
 */
export type InvoiceStatus = "draft" | "issued" | "paid" | "cancelled";

/**
 * 당사자 정보 (발행자/수신자)
 */
export interface Party {
  /** 회사명 또는 개인명 */
  name: string;
  /** 이메일 주소 */
  email?: string;
  /** 전화번호 */
  phone?: string;
  /** 주소 */
  address?: string;
}

/**
 * 견적 항목 (Notion Items 엔티티 매핑)
 */
export interface InvoiceItem {
  /** 항목 고유 ID */
  id: string;
  /** 품목명 */
  name: string;
  /** 수량 */
  quantity: number;
  /** 단가 */
  unitPrice: number;
  /** 금액 (수량 × 단가) */
  amount: number;
  /** 항목 설명 (Notion "설명" 속성) */
  description?: string;
  /** 항목 카테고리 (Notion "카테고리" 속성) */
  category?: string;
}

/**
 * 견적서 전체 정보 (Notion Invoices 엔티티 매핑)
 */
export interface Invoice {
  /** 견적서 고유 ID */
  id: string;
  /** 견적서 번호 (예: INV-2026-001) */
  invoiceNumber: string;
  /** 발행일 (YYYY-MM-DD) */
  issueDate: string;
  /** 만료일 (YYYY-MM-DD) */
  dueDate: string;
  /** 견적서 상태 */
  status: InvoiceStatus;
  /** 발행자 정보 */
  issuer: Party;
  /** 수신자 정보 */
  recipient: Party;
  /** 견적 항목 목록 */
  items: InvoiceItem[];
  /** 소계 (항목 금액 합계) - 계산용 필드, Notion에 없음 */
  subtotal?: number;
  /** 세금 (부가세) - 계산용 필드, Notion에 없음 */
  tax?: number;
  /** 총 금액 (소계 + 세금) */
  totalAmount: number;
  /** 비고 사항 */
  notes?: string;
}
