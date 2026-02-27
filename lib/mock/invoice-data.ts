/**
 * 견적서 더미 데이터 생성 유틸리티
 * 개발 및 테스트 단계에서 사용
 */

import type { Invoice, InvoiceStatus } from "@/lib/types/invoice";

/**
 * 단일 견적서 더미 데이터 생성
 * @param id - 견적서 ID (기본값: "test-123")
 * @param status - 견적서 상태 (기본값: "issued")
 * @returns 완전한 Invoice 객체
 */
export function generateMockInvoice(
  id: string = "test-123",
  status: InvoiceStatus = "issued"
): Invoice {
  return {
    id,
    invoiceNumber: "INV-2026-001",
    issueDate: "2026-02-27",
    dueDate: "2026-03-27",
    status,
    issuer: {
      name: "테스트 회사",
      email: "contact@example.com",
      phone: "02-1234-5678",
      address: "서울특별시 강남구 테헤란로 123",
    },
    recipient: {
      name: "클라이언트 회사",
      email: "client@example.com",
      phone: "02-9876-5432",
      address: "서울특별시 서초구 서초대로 456",
    },
    items: [
      {
        id: "item-1",
        name: "웹 개발 서비스",
        quantity: 1,
        unitPrice: 5000000,
        amount: 5000000,
        description: "웹사이트 풀스택 개발 서비스",
        category: "개발",
      },
      {
        id: "item-2",
        name: "유지보수 (1개월)",
        quantity: 1,
        unitPrice: 500000,
        amount: 500000,
        description: "월간 유지보수 및 기술 지원",
        category: "서비스",
      },
    ],
    subtotal: 5500000,
    tax: 550000,
    totalAmount: 6050000,
    notes: "부가세 별도",
  };
}

/**
 * 여러 개의 견적서 더미 데이터 생성
 * @param count - 생성할 견적서 개수 (기본값: 5)
 * @returns Invoice 객체 배열
 */
export function generateMockInvoices(count: number = 5): Invoice[] {
  const statuses: InvoiceStatus[] = ["draft", "issued", "paid", "cancelled"];

  return Array.from({ length: count }, (_, i) => {
    const status = statuses[i % statuses.length];
    const invoiceNumber = `INV-2026-${String(i + 1).padStart(3, "0")}`;

    return {
      ...generateMockInvoice(`test-${i + 1}`, status),
      invoiceNumber,
    };
  });
}
