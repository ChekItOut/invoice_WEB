/**
 * 관리자 견적서 목록 페이지
 * Notion API로 견적서 조회 및 검색/필터링 제공
 */

import { getInvoiceList, mapNotionPageToInvoice } from "@/lib/notion";
import type { Invoice } from "@/lib/types/invoice";
import { InvoiceListClient } from "@/components/admin/InvoiceListClient";

export default async function AdminInvoicesPage() {
  let invoices: Invoice[] = [];
  let errorMessage: string | null = null;

  try {
    // Notion API로 견적서 목록 조회
    const result = await getInvoiceList();
    invoices = result.invoices.map((page) => {
      const { invoice } = mapNotionPageToInvoice(page);
      return invoice;
    });
  } catch (error) {
    // 에러 처리
    errorMessage = "견적서 목록을 불러오는 중 오류가 발생했습니다.";
    console.error("견적서 목록 조회 실패:", error);
  }

  return (
    <div className="container max-w-screen-2xl mx-auto py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">견적서 관리</h1>
        <p className="text-muted-foreground">
          견적서 검색, 필터링 및 상세 관리
        </p>
      </div>

      {/* 에러 메시지 또는 견적서 목록 */}
      {errorMessage ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      ) : (
        <InvoiceListClient initialInvoices={invoices} />
      )}
    </div>
  );
}
