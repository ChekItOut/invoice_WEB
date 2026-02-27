import { NextRequest, NextResponse } from "next/server";

// PDF 생성 API 라우트 (골격)
export async function POST(request: NextRequest) {
  try {
    // 요청 body에서 invoiceId 파라미터 수신
    const body = await request.json();
    const { invoiceId } = body;

    // 유효성 검사
    if (!invoiceId) {
      return NextResponse.json(
        { success: false, error: "invoiceId is required" },
        { status: 400 }
      );
    }

    // 임시 응답 반환
    return NextResponse.json({
      success: true,
      message: "PDF generation placeholder",
      invoiceId,
    });
  } catch (error) {
    // 에러 핸들링
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}
