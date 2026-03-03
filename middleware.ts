/**
 * Next.js Middleware
 * /admin/* 경로를 보호하고 미인증 사용자를 로그인 페이지로 리다이렉트
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "admin-session";

/**
 * JWT Secret을 Uint8Array로 변환
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Middleware 함수
 * /admin/* 경로에 대한 인증 검증 수행
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/* 경로가 아니면 통과
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 세션 토큰 확인
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, getJwtSecret());
      isAuthenticated = true;
    } catch (error) {
      // JWT 검증 실패 (만료, 변조 등) - 인증 실패로 처리
      console.error("미들웨어 세션 검증 실패:", error);
    }
  }

  // 로그인 페이지 접근 처리
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // 이미 인증된 사용자는 관리자 대시보드로 리다이렉트
      return NextResponse.redirect(new URL("/admin/invoices", request.url));
    }
    // 미인증 사용자는 로그인 페이지 표시
    return NextResponse.next();
  }

  // 그 외 /admin/* 경로는 인증 필요
  if (!isAuthenticated) {
    // 미인증 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 인증된 사용자는 통과
  return NextResponse.next();
}

/**
 * Middleware가 실행될 경로 매칭 설정
 * /admin으로 시작하는 모든 경로에 적용
 */
export const config = {
  matcher: "/admin/:path*",
};
