"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfDownloadButtonProps {
  /** 견적서 ID */
  invoiceId: string;
  /** 견적서 번호 (파일명에 사용) */
  invoiceNumber: string;
  /** 버튼 추가 클래스명 */
  className?: string;
}

/**
 * PDF 다운로드 버튼 (Client Component)
 * 현재는 기능이 구현되지 않았으며, Task 007에서 구현 예정
 */
export function PdfDownloadButton({
  invoiceId,
  invoiceNumber,
  className,
}: PdfDownloadButtonProps) {
  const handleDownload = () => {
    // TODO: Task 007에서 PDF 생성 API 호출 구현
    console.log(`PDF 다운로드 요청: ${invoiceId} (${invoiceNumber})`);
    alert("PDF 다운로드 기능은 Task 007에서 구현 예정입니다.");
  };

  return (
    <Button className={className} onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      PDF 다운로드
    </Button>
  );
}
