/**
 * 견적서 목록 클라이언트 컴포넌트
 * 검색, 필터링 등 상호작용 기능 제공
 */

"use client";

import { useState, useMemo } from "react";
import type { Invoice, InvoiceStatus } from "@/lib/types/invoice";
import { SearchBar } from "@/components/admin/SearchBar";
import { FilterPanel } from "@/components/admin/FilterPanel";
import { InvoiceTable } from "@/components/admin/InvoiceTable";
import { filterInvoices } from "@/lib/utils/invoice-filter";

interface InvoiceListClientProps {
  initialInvoices: Invoice[];
}

export function InvoiceListClient({ initialInvoices }: InvoiceListClientProps) {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");

  // 상태 필터 관리
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");

  // 필터링된 견적서 목록 계산 (useMemo로 최적화)
  const filteredInvoices = useMemo(() => {
    return filterInvoices(initialInvoices, {
      searchTerm,
      statusFilter,
    });
  }, [initialInvoices, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색 바 */}
        <div className="flex-1">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {/* 필터 패널 */}
        <FilterPanel onStatusChange={setStatusFilter} />
      </div>

      {/* 필터링 결과 정보 */}
      <div className="text-sm text-muted-foreground">
        {filteredInvoices.length === initialInvoices.length ? (
          <p>전체 {initialInvoices.length}개의 견적서</p>
        ) : (
          <p>
            전체 {initialInvoices.length}개 중 {filteredInvoices.length}개 표시
          </p>
        )}
      </div>

      {/* 견적서 테이블 */}
      {filteredInvoices.length > 0 ? (
        <InvoiceTable invoices={filteredInvoices} />
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            조건에 맞는 견적서가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
