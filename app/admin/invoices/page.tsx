/**
 * 관리자 견적서 목록 페이지
 * Notion API로 견적서 조회 - Card 형태로 표시
 */

import { getInvoiceList, mapNotionPageToInvoice } from "@/lib/notion";
import type { Invoice } from "@/lib/types/invoice";
import { InvoiceCard } from "@/components/invoice/invoice-card";

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
          전체 {invoices.length}개의 견적서
        </p>
      </div>

      {/* 에러 메시지 */}
      {errorMessage && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* 빈 목록 상태 */}
      {invoices.length === 0 && !errorMessage ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            등록된 견적서가 없습니다.
          </p>
        </div>
      ) : (
        // 반응형 그리드: mobile 1열, tablet 2열, desktop 3열
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}
