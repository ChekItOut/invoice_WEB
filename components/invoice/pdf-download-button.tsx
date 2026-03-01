"use client";

import { useState } from "react";
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
 * PDF 생성 API를 호출하여 견적서 PDF를 다운로드합니다.
 */
export function PdfDownloadButton({
  invoiceId,
  invoiceNumber,
  className,
}: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // 1. PDF 생성 API 호출
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      // 2. 에러 응답 처리
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "PDF 생성에 실패했습니다.");
      }

      // 3. PDF Blob 생성
      const blob = await response.blob();

      // 4. 다운로드 트리거
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `견적서_${invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();

      // 5. 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("PDF 다운로드 실패:", error);

      // 구체적인 에러 메시지 제공
      let message = "PDF 다운로드에 실패했습니다.";
      if (error instanceof Error) {
        if (error.message.includes("찾을 수 없습니다")) {
          message = "견적서를 찾을 수 없습니다.";
        } else if (error.message.includes("Notion")) {
          message = "견적서 데이터를 불러오는데 실패했습니다.";
        } else {
          message = `PDF 다운로드 실패: ${error.message}`;
        }
      }

      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={className}
      onClick={handleDownload}
      disabled={isLoading}
    >
      <Download className="mr-2 h-4 w-4" />
      {isLoading ? "PDF 생성 중..." : "PDF 다운로드"}
    </Button>
  );
}
