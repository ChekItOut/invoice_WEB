/**
 * 관리자 로그인 API 엔드포인트
 * POST /api/admin/auth/login
 */

import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";

/**
 * 로그인 요청 처리
 * @param request - 비밀번호를 포함한 요청
 * @returns 성공/실패 응답
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // 비밀번호 입력 확인
    if (!password) {
      return NextResponse.json(
        { success: false, message: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 세션 생성 (비밀번호 검증 포함)
    const isValid = await createSession(password);

    if (!isValid) {
      // 보안: 구체적인 에러 정보 제공하지 않음 (계정 열거 공격 방지)
      return NextResponse.json(
        { success: false, message: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 로그인 성공
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("로그인 에러:", error);
    return NextResponse.json(
      { success: false, message: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
