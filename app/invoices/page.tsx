import { InvoiceCard } from "@/components/invoice/invoice-card";
import { generateMockInvoices } from "@/lib/mock/invoice-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * 견적서 목록 페이지
 * - 전체 견적서를 그리드 레이아웃으로 표시
 * - 반응형: 모바일 1열, 태블릿 2열, 데스크톱 3열
 * - 빈 상태 처리 포함
 */
export default function InvoicesPage() {
  const invoices = generateMockInvoices(10);

  return (
    <div className="container max-w-screen-2xl mx-auto py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">견적서 목록</h1>
        <p className="text-muted-foreground">
          전체 {invoices.length}개의 견적서
        </p>
      </div>

      {/* 빈 목록 상태 */}
      {invoices.length === 0 ? (
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
