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
      console.log("=== PDF Download Request ===");
      console.log("Invoice ID:", invoiceId);

      // 1. PDF 생성 API 호출
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      console.log("API Response Status:", response.status);

      // 2. 에러 응답 처리
      if (!response.ok) {
        const errorData = await response.json();
        console.error("=== PDF Download Failed ===");
        console.error("HTTP Status:", response.status);
        console.error("Error response:", errorData);

        throw new Error(errorData.error || "PDF 생성에 실패했습니다.");
      }

      console.log("PDF download successful, processing blob...");

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
      console.error("=== PDF Download Error ===");
      console.error("Error:", error);

      // 구체적인 에러 메시지 제공
      let message = "PDF 다운로드에 실패했습니다.";
      if (error instanceof Error) {
        if (error.message.includes("서버 설정 오류")) {
          message = "시스템 설정 오류가 발생했습니다. 관리자에게 문의해주세요.";
        } else if (error.message.includes("찾을 수 없습니다")) {
          message = "견적서를 찾을 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요.";
        } else if (error.message.includes("Notion")) {
          message = "견적서 데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.";
        } else if (error.message.includes("렌더링")) {
          message = "PDF 생성 중 오류가 발생했습니다. 견적서 데이터를 확인해주세요.";
        } else if (error.message.includes("필수")) {
          message = "견적서 정보가 누락되었습니다. 견적서를 확인해주세요.";
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
