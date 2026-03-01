"use client";

import { Button } from "@/components/ui/button";
import { InvoicePdfTemplate } from "./invoice-pdf-template";
import { Printer, Download } from "lucide-react";
import type { Invoice } from "@/lib/types/invoice";

interface InvoicePdfPreviewProps {
  invoice: Invoice;
  /** 회사 로고 URL (선택사항) */
  companyLogo?: string;
  /** PDF 다운로드 핸들러 (선택사항) */
  onDownloadPdf?: () => void;
}

/**
 * 인보이스 PDF 프리뷰 컴포넌트
 * - 화면 프리뷰 제공
 * - 인쇄 및 PDF 다운로드 버튼 포함
 * - Client Component로 인쇄 기능 구현
 */
export function InvoicePdfPreview({
  invoice,
  companyLogo,
  onDownloadPdf,
}: InvoicePdfPreviewProps) {
  /**
   * 브라우저 인쇄 대화상자 열기
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * PDF 다운로드 (외부 핸들러 호출 또는 기본 동작)
   */
  const handleDownload = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    } else {
      // TODO: PDF 생성 API 호출 로직 구현 필요
      console.log("PDF 다운로드 기능 구현 필요");
    }
  };

  return (
    <div className="space-y-4">
      {/* 액션 버튼 (인쇄 시 숨김) */}
      <div className="no-print flex justify-end gap-3 sticky top-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
        <Button
          variant="outline"
          size="default"
          onClick={handlePrint}
          className="gap-2"
        >
          <Printer className="size-4" />
          인쇄하기
        </Button>
        <Button
          variant="default"
          size="default"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="size-4" />
          PDF 다운로드
        </Button>
      </div>

      {/* PDF 템플릿 */}
      <InvoicePdfTemplate invoice={invoice} companyLogo={companyLogo} />
    </div>
  );
}
