import { InvoiceCard } from "@/components/invoice/invoice-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getInvoiceList,
  mapNotionPageToInvoice,
  NotionQueryError,
} from "@/lib/notion";
import type { Invoice } from "@/lib/types/invoice";

/**
 * 견적서 목록 페이지 (Server Component)
 * - Notion API에서 견적서 데이터를 조회하여 렌더링
 * - 반응형: 모바일 1열, 태블릿 2열, 데스크톱 3열
 * - 에러 및 빈 상태 처리 포함
 */
export default async function InvoicesPage() {
  let invoices: Invoice[] = [];
  let errorMessage: string | null = null;

  try {
    const result = await getInvoiceList();

    // Notion 페이지 응답을 Invoice 타입으로 변환 (목록에서는 items 조회 생략)
    invoices = result.invoices.map((page) => {
      const { invoice } = mapNotionPageToInvoice(page);
      return invoice;
    });
  } catch (error) {
    // 에러 발생 시 빈 배열 유지하고 에러 메시지 표시

    if (error instanceof NotionQueryError) {
      errorMessage = error.message;
      console.error(
        `[견적서 목록 조회 실패] code=${error.code}, status=${error.statusCode}: ${error.message}`
      );
    } else {
      errorMessage = "견적서 목록을 불러오는 중 오류가 발생했습니다.";
      console.error("[견적서 목록 조회 실패] 알 수 없는 오류:", error);
    }
  }

  return (
    <div className="container max-w-screen-2xl mx-auto py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">견적서 목록</h1>
        <p className="text-muted-foreground">
          전체 {invoices.length}개의 견적서
        </p>
      </div>

      {/* 에러 상태 */}
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
          <Button asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
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
