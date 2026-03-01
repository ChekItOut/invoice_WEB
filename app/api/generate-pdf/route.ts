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
    // 0. 환경변수 검증
    if (!process.env.NOTION_API_KEY) {
      console.error("NOTION_API_KEY is not set in environment variables");
      return NextResponse.json(
        { success: false, error: "서버 설정 오류: Notion API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    if (!process.env.NOTION_DATABASE_ID) {
      console.error("NOTION_DATABASE_ID is not set in environment variables");
      return NextResponse.json(
        { success: false, error: "서버 설정 오류: Notion 데이터베이스 ID가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 1. 요청 파싱
    const body = await request.json();
    const { invoiceId } = body;

    console.log("=== PDF Generation Request ===");
    console.log("Invoice ID:", invoiceId);

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
    console.log("Fetching invoice from Notion...");
    const notionPage = await getInvoicePage(invoiceId);
    console.log("Notion page retrieved successfully:", notionPage.id);

    const { invoice, itemRelationIds } = mapNotionPageToInvoice(notionPage);
    console.log("Invoice mapped:", {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      itemRelationIdsCount: itemRelationIds.length,
    });

    // 필수 필드 검증
    if (!invoice.invoiceNumber || !invoice.issueDate) {
      throw new Error("필수 견적서 정보가 누락되었습니다.");
    }

    // 4. 견적 항목 조회 및 매핑
    if (itemRelationIds.length > 0) {
      console.log(`Fetching ${itemRelationIds.length} invoice items...`);
      const itemPages = await getInvoiceItems(itemRelationIds);
      invoice.items = mapNotionItemsToInvoiceItems(itemPages);
      console.log(`Invoice items mapped: ${invoice.items.length} items`);
    } else {
      console.log("No invoice items to fetch");
    }

    // 5. PDF 생성
    console.log("Generating PDF...");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfBuffer = await renderToBuffer(
        React.createElement(InvoicePDFTemplate, { invoice }) as any
      );

      console.log("PDF generated successfully, size:", pdfBuffer.byteLength, "bytes");

      // 6. 파일명 생성 (한글 인코딩)
      const filename = `견적서_${invoice.invoiceNumber}.pdf`;
      const encodedFilename = encodeURIComponent(filename);

      // 7. PDF 응답 반환 (Buffer를 Uint8Array로 변환)
      const uint8Array = new Uint8Array(pdfBuffer);
      console.log("Sending PDF response...");

      return new Response(uint8Array, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${encodedFilename}"`,
          "Content-Length": pdfBuffer.byteLength.toString(),
        },
      });
    } catch (pdfError) {
      console.error("=== PDF Rendering Failed ===");
      console.error("Error type:", pdfError?.constructor?.name);
      console.error("Error message:", pdfError instanceof Error ? pdfError.message : String(pdfError));
      console.error("Error stack:", pdfError instanceof Error ? pdfError.stack : "No stack trace");

      throw new Error(`PDF 렌더링 실패: ${pdfError instanceof Error ? pdfError.message : String(pdfError)}`);
    }
  } catch (error) {
    // 8. 에러 핸들링
    console.error("=== PDF Generation Error ===");
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");

    // Notion API 에러 처리
    if (error instanceof NotionQueryError) {
      console.error("NotionQueryError details:", {
        code: error.code,
        statusCode: error.statusCode,
        message: error.message,
      });

      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    // 일반 에러 처리
    const errorMessage = error instanceof Error ? error.message : "PDF 생성에 실패했습니다.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
