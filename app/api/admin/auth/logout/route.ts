/**
 * 관리자 로그아웃 API 엔드포인트
 * POST /api/admin/auth/logout
 */

import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

/**
 * 로그아웃 요청 처리
 * 현재 세션을 파기하고 성공 응답 반환
 * @returns 성공 응답
 */
export async function POST() {
  try {
    // 세션 쿠키 삭제
    await destroySession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("로그아웃 에러:", error);
    // 로그아웃은 실패해도 클라이언트에서 처리 가능하도록 성공 반환
    return NextResponse.json({ success: true });
  }
}
