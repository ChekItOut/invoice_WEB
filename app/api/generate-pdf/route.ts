/**
 * PDF 생성 API 엔드포인트
 * Notion에서 견적서 데이터를 조회하고 PDF를 생성하여 다운로드 가능한 응답을 반환합니다.
 */

import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { InvoicePDFTemplate } from "@/components/pdf/invoice-template";
import {
  getInvoicePage,
  getInvoiceItems,
  mapNotionPageToInvoice,
  mapNotionItemsToInvoiceItems,
  NotionQueryError,
} from "@/lib/notion";

/**
 * POST /api/generate-pdf
 * 견적서 ID를 받아 PDF를 생성하고 다운로드 가능한 응답을 반환합니다.
 *
 * @param request - { invoiceId: string } 포함
 * @returns PDF 파일 또는 에러 응답
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 파싱
    const body = await request.json();
    const { invoiceId } = body;

    // 2. 유효성 검사
    if (!invoiceId || typeof invoiceId !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "invoiceId is required and must be a string",
        },
        { status: 400 }
      );
    }

    // 3. Notion에서 견적서 페이지 조회
    const notionPage = await getInvoicePage(invoiceId);
    const { invoice, itemRelationIds } = mapNotionPageToInvoice(notionPage);

    // 4. 견적 항목 조회 및 매핑
    if (itemRelationIds.length > 0) {
      const itemPages = await getInvoiceItems(itemRelationIds);
      invoice.items = mapNotionItemsToInvoiceItems(itemPages);
    }

    // 5. PDF 생성
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(
      React.createElement(InvoicePDFTemplate, { invoice }) as any
    );

    // 6. 파일명 생성 (한글 인코딩)
    const filename = `견적서_${invoice.invoiceNumber}.pdf`;
    const encodedFilename = encodeURIComponent(filename);

    // 7. PDF 응답 반환 (Buffer를 Uint8Array로 변환)
    const uint8Array = new Uint8Array(pdfBuffer);
    return new Response(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodedFilename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    // 8. 에러 핸들링
    console.error("PDF generation error:", error);

    // Notion API 에러 처리
    if (error instanceof NotionQueryError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    // 일반 에러 처리
    return NextResponse.json(
      { success: false, error: "PDF 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
