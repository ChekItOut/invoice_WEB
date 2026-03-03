/**
 * 견적서 필터링 유틸리티 함수
 * 검색어, 상태, 날짜 범위로 견적서 목록을 필터링
 */

import type { Invoice } from "@/lib/types/invoice";
import type { FilterOptions } from "@/lib/types/admin";

/**
 * 견적서 목록을 필터 옵션에 따라 필터링합니다.
 * @param invoices - 원본 견적서 배열
 * @param filters - 검색어, 상태, 날짜 범위 필터
 * @returns 필터링된 견적서 배열
 */
export function filterInvoices(
  invoices: Invoice[],
  filters: FilterOptions
): Invoice[] {
  return invoices.filter((invoice) => {
    // 검색어 필터링 (견적서 번호 또는 클라이언트명)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchesNumber = invoice.invoiceNumber.toLowerCase().includes(term);
      const matchesClient = invoice.recipient.name.toLowerCase().includes(term);

      if (!matchesNumber && !matchesClient) {
        return false;
      }
    }

    // 상태 필터링
    if (filters.statusFilter && filters.statusFilter !== "all") {
      if (invoice.status !== filters.statusFilter) {
        return false;
      }
    }

    // 날짜 범위 필터링
    if (filters.dateRange) {
      const issueDate = new Date(invoice.issueDate);
      if (
        issueDate < filters.dateRange.start ||
        issueDate > filters.dateRange.end
      ) {
        return false;
      }
    }

    return true;
  });
}
