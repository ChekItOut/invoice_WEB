import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  formatDate,
  getStatusBadgeVariant,
  getStatusLabel,
} from "@/lib/utils/invoice";
import type { Invoice } from "@/lib/types/invoice";

interface InvoiceCardProps {
  invoice: Invoice;
}

/**
 * 견적서 카드 컴포넌트
 * - 클릭 시 상세 페이지로 이동
 * - hover 효과로 클릭 가능성 명시
 * - h-full로 그리드 내 높이 균등화
 */
export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link href={`/invoice/${invoice.id}`} className="block">
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg">{invoice.invoiceNumber}</h3>
            <Badge variant={getStatusBadgeVariant(invoice.status)}>
              {getStatusLabel(invoice.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 수신자명 */}
          <div>
            <p className="text-sm text-muted-foreground">수신자</p>
            <p className="font-medium">{invoice.recipient.name}</p>
          </div>

          {/* 발행일 */}
          <div>
            <p className="text-sm text-muted-foreground">발행일</p>
            <p>{formatDate(invoice.issueDate)}</p>
          </div>

          {/* 총 금액 */}
          <div className="pt-3 border-t">
            <p className="text-sm text-muted-foreground mb-1">총 금액</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(invoice.totalAmount)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
