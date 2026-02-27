import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PdfDownloadButton } from "@/components/invoice/pdf-download-button";
import { generateMockInvoice } from "@/lib/mock/invoice-data";
import type { InvoiceStatus } from "@/lib/types/invoice";

interface PageProps {
  params: { id: string };
}

/**
 * 숫자를 한국 원화 형식으로 포맷팅 (예: 5,000,000원)
 */
function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

/**
 * 날짜를 한국 형식으로 포맷팅 (예: 2026년 2월 27일)
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 견적서 상태별 배지 스타일 반환
 */
function getStatusBadgeVariant(
  status: InvoiceStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "draft":
      return "secondary"; // 회색
    case "issued":
      return "default"; // 파란색 (기본)
    case "paid":
      return "outline"; // 초록색 (outline을 커스텀으로 사용)
    case "cancelled":
      return "destructive"; // 빨간색
  }
}

/**
 * 견적서 상태를 한국어로 변환
 */
function getStatusLabel(status: InvoiceStatus): string {
  switch (status) {
    case "draft":
      return "임시저장";
    case "issued":
      return "발행됨";
    case "paid":
      return "결제완료";
    case "cancelled":
      return "취소됨";
  }
}

export default function InvoicePage({ params }: PageProps) {
  // 더미 데이터 생성
  const invoice = generateMockInvoice(params.id);

  return (
    <div className="container max-w-screen-2xl mx-auto py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
      {/* 견적서 헤더 영역 - 모바일: 세로 쌓기, 데스크톱: 좌우 배치 */}
      <div className="invoice-section flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{invoice.invoiceNumber}</h1>
          <div className="flex flex-col gap-1 text-sm md:text-base text-muted-foreground">
            <p>발행일: {formatDate(invoice.issueDate)}</p>
            <p>유효기간: {formatDate(invoice.dueDate)}</p>
          </div>
          <div className="mt-3">
            <Badge variant={getStatusBadgeVariant(invoice.status)}>
              {getStatusLabel(invoice.status)}
            </Badge>
          </div>
        </div>

        {/* PDF 다운로드 버튼 - 데스크톱 우측 상단 */}
        <PdfDownloadButton
          invoiceId={invoice.id}
          invoiceNumber={invoice.invoiceNumber}
          className="w-full md:w-auto"
        />
      </div>

      {/* 발행자/수신자 정보 카드 - 모바일: 세로 쌓기, 태블릿/데스크톱: 2열 그리드 */}
      <div className="invoice-section grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* 발행자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">발행자 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="font-semibold text-base">{invoice.issuer.name}</p>
            </div>
            {invoice.issuer.email && (
              <div>
                <span className="text-muted-foreground">이메일: </span>
                <span>{invoice.issuer.email}</span>
              </div>
            )}
            {invoice.issuer.phone && (
              <div>
                <span className="text-muted-foreground">전화번호: </span>
                <span>{invoice.issuer.phone}</span>
              </div>
            )}
            {invoice.issuer.address && (
              <div>
                <span className="text-muted-foreground">주소: </span>
                <span>{invoice.issuer.address}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 수신자 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">수신자 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="font-semibold text-base">{invoice.recipient.name}</p>
            </div>
            {invoice.recipient.email && (
              <div>
                <span className="text-muted-foreground">이메일: </span>
                <span>{invoice.recipient.email}</span>
              </div>
            )}
            {invoice.recipient.phone && (
              <div>
                <span className="text-muted-foreground">전화번호: </span>
                <span>{invoice.recipient.phone}</span>
              </div>
            )}
            {invoice.recipient.address && (
              <div>
                <span className="text-muted-foreground">주소: </span>
                <span>{invoice.recipient.address}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 견적 항목 테이블 영역 - 데스크톱: 테이블, 모바일: 카드 뷰 */}
      <Card className="invoice-section mb-6 md:mb-8">
        <CardHeader>
          <CardTitle className="text-lg">견적 항목</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 데스크톱 테이블 뷰 */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">항목명</th>
                  <th className="text-right py-3 px-4 font-semibold">수량</th>
                  <th className="text-right py-3 px-4 font-semibold">단가</th>
                  <th className="text-right py-3 px-4 font-semibold">금액</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">{item.quantity}</td>
                    <td className="text-right py-4 px-4">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="text-right py-4 px-4 font-semibold">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 뷰 - 가독성 높은 레이아웃 */}
          <div className="md:hidden space-y-3">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div>
                  <p className="font-medium text-base">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">수량: </span>
                    <span>{item.quantity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">단가: </span>
                    <span>{formatCurrency(item.unitPrice)}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">금액</span>
                    <span className="font-semibold text-lg">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 합계 금액 표시 영역 */}
      <Card className="invoice-section mb-6 md:mb-8">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {/* 소계 */}
            {invoice.subtotal !== undefined && (
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-muted-foreground">소계</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
            )}

            {/* 세금 */}
            {invoice.tax !== undefined && (
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-muted-foreground">부가세</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
            )}

            {/* 구분선 */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base md:text-lg font-bold">총 금액</span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </div>
            </div>

            {/* 비고 */}
            {invoice.notes && (
              <div className="pt-4 border-t mt-4">
                <p className="text-sm text-muted-foreground mb-1">비고</p>
                <p className="text-sm">{invoice.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
