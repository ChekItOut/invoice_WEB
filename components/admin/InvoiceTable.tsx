/**
 * 관리자용 견적서 테이블 컴포넌트
 * 견적서 목록을 테이블 형태로 표시
 */

import type { Invoice } from "@/lib/types/invoice";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatCurrency,
  getStatusBadgeVariant,
  getStatusLabel,
} from "@/lib/utils/invoice";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  // 빈 목록 처리
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        등록된 견적서가 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-4 text-left font-medium">견적서 번호</th>
            <th className="p-4 text-left font-medium">클라이언트</th>
            <th className="p-4 text-left font-medium">발행일</th>
            <th className="p-4 text-left font-medium">상태</th>
            <th className="p-4 text-right font-medium">총액</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b last:border-0">
              <td className="p-4">{invoice.invoiceNumber}</td>
              <td className="p-4">{invoice.recipient.name}</td>
              <td className="p-4">{formatDate(invoice.issueDate)}</td>
              <td className="p-4">
                <Badge variant={getStatusBadgeVariant(invoice.status)}>
                  {getStatusLabel(invoice.status)}
                </Badge>
              </td>
              <td className="p-4 text-right font-medium">
                {formatCurrency(invoice.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
