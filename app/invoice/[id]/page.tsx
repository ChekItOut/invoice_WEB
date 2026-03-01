import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getInvoicePage,
  getInvoiceItems,
  NotionQueryError,
  mapNotionPageToInvoice,
  mapNotionItemsToInvoiceItems,
} from "@/lib/notion";
import type { InvoiceStatus } from "@/lib/types/invoice";

/**
 * PDF 다운로드 버튼 컴포넌트 동적 import
 * 초기 번들 크기 감소를 위해 lazy loading 적용
 */
const PdfDownloadButton = dynamic(
  () => import("@/components/invoice/pdf-download-button").then((mod) => ({ default: mod.PdfDownloadButton }))
);

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 페이지 캐싱 설정 (ISR - Incremental Static Regeneration)
 * 1시간(3600초) 동안 캐시된 페이지를 제공하고, 그 이후 재검증
 */
export const revalidate = 3600;

/**
 * 견적서 페이지 동적 메타데이터 생성
 * SEO 최적화 및 소셜 미디어 공유를 위한 메타 태그 설정
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    // Notion에서 견적서 페이지 조회
    const notionPage = await getInvoicePage(id);
    const { invoice } = mapNotionPageToInvoice(notionPage);

    // 발행일 포맷팅
    const issueDate = invoice.issueDate
      ? new Date(invoice.issueDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "미지정";

    // 수신자명
    const recipientName = invoice.recipient.name || "미지정";

    const title = `견적서 ${invoice.invoiceNumber} | Next Starter Kit`;
    const description = `발행일: ${issueDate}, 수신자: ${recipientName}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch (error) {
    // 에러 발생 시 기본 메타데이터 반환
    return {
      title: "견적서 | Next Starter Kit",
      description: "견적서 조회 페이지",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
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
  if (!dateString) return "미지정";
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

/**
 * 견적서 상세 페이지 (Server Component)
 * Notion API에서 실제 견적서 데이터를 조회하여 렌더링합니다.
 */
export default async function InvoicePage({ params }: PageProps) {
  const { id } = await params;

  // Notion에서 견적서 페이지 조회
  let notionPage;
  try {
    notionPage = await getInvoicePage(id);
  } catch (error) {
    if (error instanceof NotionQueryError && error.statusCode === 404) {
      notFound();
    }
    // 기타 에러는 에러 바운더리로 전파
    throw error;
  }

  // Notion 응답을 Invoice 타입으로 변환
  const { invoice, itemRelationIds } = mapNotionPageToInvoice(notionPage);

  // 관계된 항목(Items) 페이지들을 조회하여 매핑
  if (itemRelationIds.length > 0) {
    const itemPages = await getInvoiceItems(itemRelationIds);
    invoice.items = mapNotionItemsToInvoiceItems(itemPages);
  }

  return (
    <div className="container max-w-screen-2xl mx-auto py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
      {/* 견적서 헤더 영역 - 모바일: 세로 쌓기, 데스크톱: 좌우 배치 */}
      <div className="invoice-section flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {invoice.invoiceNumber}
          </h1>
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
              <p className="font-semibold text-base">
                {invoice.issuer.name}
              </p>
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
              <p className="font-semibold text-base">
                {invoice.recipient.name}
              </p>
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
          {invoice.items.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              등록된 항목이 없습니다.
            </p>
          ) : (
            <>
              {/* 데스크톱 테이블 뷰 */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">
                        항목명
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        수량
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        단가
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b last:border-0"
                      >
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
                        <td className="text-right py-4 px-4">
                          {item.quantity}
                        </td>
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
                        <span className="text-muted-foreground">
                          수량:{" "}
                        </span>
                        <span>{item.quantity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          단가:{" "}
                        </span>
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
            </>
          )}
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
                <span className="text-base md:text-lg font-bold">
                  총 금액
                </span>
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
