import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils/invoice";
import type { Invoice } from "@/lib/types/invoice";

interface InvoicePdfTemplateProps {
  invoice: Invoice;
  /** 회사 로고 URL (선택사항) */
  companyLogo?: string;
}

/**
 * 인보이스/견적서 PDF 템플릿 컴포넌트
 * - A4 사이즈 기준 (210mm x 297mm)
 * - 인쇄 친화적 레이아웃
 * - print 미디어 쿼리로 최적화
 * - 화면 프리뷰와 인쇄 모두 지원
 */
export function InvoicePdfTemplate({
  invoice,
  companyLogo,
}: InvoicePdfTemplateProps) {
  // 금액 계산
  const subtotal =
    invoice.subtotal ||
    invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = invoice.tax || subtotal * 0.1; // 10% 부가세 (기본값)
  const total = invoice.totalAmount || subtotal + tax;

  return (
    <div className="invoice-pdf-wrapper bg-background">
      {/* A4 사이즈 컨테이너 (210mm x 297mm = 794px x 1123px at 96dpi) */}
      <div className="invoice-page mx-auto max-w-4xl bg-white shadow-lg print:shadow-none print:max-w-full">
        {/* 페이지 내용 */}
        <div className="p-8 print:p-6 space-y-6">
          {/* 헤더 섹션: 회사 정보 + 견적서 정보 */}
          <header className="invoice-section flex justify-between items-start pb-6 border-b print:border-gray-300">
            {/* 회사 로고 및 발행자 정보 */}
            <div className="space-y-3">
              {companyLogo && (
                <div className="mb-4">
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="h-12 w-auto print:h-10"
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-foreground print:text-black">
                  {invoice.issuer.name}
                </h2>
                {invoice.issuer.address && (
                  <p className="text-sm text-muted-foreground print:text-gray-600 mt-1">
                    {invoice.issuer.address}
                  </p>
                )}
                <div className="text-sm text-muted-foreground print:text-gray-600 mt-2 space-y-0.5">
                  {invoice.issuer.email && <p>Email: {invoice.issuer.email}</p>}
                  {invoice.issuer.phone && <p>Tel: {invoice.issuer.phone}</p>}
                </div>
              </div>
            </div>

            {/* 견적서 번호 및 날짜 */}
            <div className="text-right space-y-2">
              <h1 className="text-3xl font-bold text-primary print:text-black">
                견적서
              </h1>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">번호:</span>{" "}
                  {invoice.invoiceNumber}
                </p>
                <p>
                  <span className="font-medium">발행일:</span>{" "}
                  {formatDate(invoice.issueDate)}
                </p>
                <p>
                  <span className="font-medium">만료일:</span>{" "}
                  {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
          </header>

          {/* 수신자 정보 섹션 */}
          <section className="invoice-section">
            <Card className="print:border-gray-300 print:shadow-none">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-muted-foreground print:text-gray-700 mb-3">
                  수신자 정보
                </h3>
                <div className="space-y-1">
                  <p className="font-bold text-lg text-foreground print:text-black">
                    {invoice.recipient.name}
                  </p>
                  {invoice.recipient.address && (
                    <p className="text-sm text-muted-foreground print:text-gray-600">
                      {invoice.recipient.address}
                    </p>
                  )}
                  <div className="text-sm text-muted-foreground print:text-gray-600 pt-1">
                    {invoice.recipient.email && (
                      <p>Email: {invoice.recipient.email}</p>
                    )}
                    {invoice.recipient.phone && (
                      <p>Tel: {invoice.recipient.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 항목 테이블 섹션 */}
          <section className="invoice-section">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary print:border-black">
                    <th className="text-left py-3 px-2 font-semibold text-sm print:text-black">
                      번호
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-sm print:text-black">
                      품목명
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-sm print:text-black">
                      수량
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-sm print:text-black">
                      단가
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-sm print:text-black">
                      금액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-border print:border-gray-300"
                    >
                      <td className="py-3 px-2 text-sm text-muted-foreground print:text-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-sm print:text-black">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground print:text-gray-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-sm print:text-black">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-2 text-right text-sm print:text-black">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="py-3 px-2 text-right font-medium text-sm print:text-black">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 합계 섹션 */}
          <section className="invoice-section">
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-muted-foreground print:text-gray-600">
                    소계:
                  </span>
                  <span className="font-medium print:text-black">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm border-b border-border print:border-gray-300">
                  <span className="text-muted-foreground print:text-gray-600">
                    부가세 (10%):
                  </span>
                  <span className="font-medium print:text-black">
                    {formatCurrency(tax)}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-lg border-t-2 border-primary print:border-black">
                  <span className="font-bold print:text-black">총 금액:</span>
                  <span className="font-bold text-primary print:text-black">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 결제 조건 및 노트 섹션 */}
          {invoice.notes && (
            <section className="invoice-section">
              <Card className="print:border-gray-300 print:shadow-none bg-muted/30 print:bg-gray-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-muted-foreground print:text-gray-700 mb-2">
                    비고
                  </h3>
                  <p className="text-sm text-foreground print:text-black whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              </Card>
            </section>
          )}

          {/* 푸터: 결제 안내 */}
          <footer className="invoice-section pt-6 border-t print:border-gray-300">
            <div className="text-center text-xs text-muted-foreground print:text-gray-500 space-y-1">
              <p>
                본 견적서는 발행일로부터 30일간 유효하며, 기간 경과 시 재검토가
                필요합니다.
              </p>
              <p>문의사항은 위 연락처로 연락 주시기 바랍니다.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
