/**
 * 관리자용 견적서 테이블 컴포넌트
 * 견적서 목록을 테이블 형태로 표시
 * - 행 클릭 시 상세 페이지로 이동
 * - 링크 복사 버튼 제공
 */

"use client";

import Link from "next/link";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import type { Invoice } from "@/lib/types/invoice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 링크 복사 핸들러
  const handleCopyLink = async (invoiceId: string, e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이동 방지
    e.stopPropagation(); // 행 클릭 이벤트 방지
    const link = `${window.location.origin}/invoice/${invoiceId}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(invoiceId);

      // 2초 후 복사 상태 초기화
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("링크 복사 실패:", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

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
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left font-medium">견적서 번호</th>
              <th className="p-4 text-left font-medium">클라이언트</th>
              <th className="p-4 text-left font-medium">발행일</th>
              <th className="p-4 text-left font-medium">상태</th>
              <th className="p-4 text-right font-medium">총액</th>
              <th className="p-4 text-center font-medium">작업</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <td className="p-4">
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="font-medium hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                </td>
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
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleCopyLink(invoice.id, e)}
                      title="링크 복사"
                    >
                      {copiedId === invoice.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" asChild title="새 탭에서 열기">
                      <Link href={`/invoice/${invoice.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 뷰 */}
      <div className="md:hidden divide-y">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            href={`/invoice/${invoice.id}`}
            className="block p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{invoice.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.recipient.name}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(invoice.status)}>
                  {getStatusLabel(invoice.status)}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {formatDate(invoice.issueDate)}
                </span>
                <span className="font-semibold text-primary">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleCopyLink(invoice.id, e)}
                  className="flex-1"
                >
                  {copiedId === invoice.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      링크 복사
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
