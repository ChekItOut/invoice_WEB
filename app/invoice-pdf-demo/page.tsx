import { InvoicePdfPreview } from "@/components/invoice/invoice-pdf-preview";
import { generateMockInvoice } from "@/lib/mock/invoice-data";

/**
 * 인보이스 PDF 템플릿 데모 페이지
 * - PDF 프리뷰 화면 제공
 * - 인쇄 및 다운로드 기능 테스트
 */
export default function InvoicePdfDemoPage() {
  // 더미 데이터 생성
  const mockInvoice = generateMockInvoice("demo-001", "issued");

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container max-w-screen-2xl mx-auto py-8">
        {/* 페이지 헤더 (인쇄 시 숨김) */}
        <div className="no-print mb-8">
          <h1 className="text-3xl font-bold mb-2">인보이스 PDF 프리뷰</h1>
          <p className="text-muted-foreground">
            아래 버튼으로 인쇄 또는 PDF 다운로드를 할 수 있습니다.
          </p>
        </div>

        {/* PDF 프리뷰 컴포넌트 */}
        <InvoicePdfPreview
          invoice={mockInvoice}
          companyLogo={undefined} // 로고 URL이 있다면 여기에 추가
        />
      </div>
    </div>
  );
}
