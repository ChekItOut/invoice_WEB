/**
 * PDF 생성 관련 타입 정의
 */

/**
 * PDF 생성 요청
 */
export interface PDFGenerationRequest {
  /** 견적서 ID */
  invoiceId: string;
}

/**
 * PDF 생성 응답
 */
export interface PDFGenerationResponse {
  /** 성공 여부 */
  success: boolean;
  /** PDF 다운로드 URL (성공 시) */
  pdfUrl?: string;
  /** 에러 메시지 (실패 시) */
  error?: string;
}
