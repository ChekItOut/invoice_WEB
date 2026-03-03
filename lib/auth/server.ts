/**
 * 서버 컴포넌트 및 미들웨어에서 사용하는 인증 유틸리티
 * JWT 기반 세션 검증 및 쿠키 관리
 */

import { cookies } from "next/headers";
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
 * 서버 컴포넌트에서 세션 확인
 * @returns 인증 여부와 세션 데이터
 */
export async function getSession(): Promise<{
  isAuthenticated: boolean;
  username?: string;
}> {
  try {
    // Next.js 15에서 cookies()는 Promise를 반환
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return { isAuthenticated: false };
    }

    // JWT 검증
    const { payload } = await jwtVerify(token, getJwtSecret());

    return {
      isAuthenticated: true,
      username: payload.username as string,
    };
  } catch (error) {
    console.error("세션 검증 실패:", error);
    return { isAuthenticated: false };
  }
}

/**
 * JWT 토큰 검증만 수행 (미들웨어용)
 * @param token - JWT 토큰 문자열
 * @returns 검증 성공 여부
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getJwtSecret());
    return true;
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
}
