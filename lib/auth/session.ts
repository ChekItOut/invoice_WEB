/**
 * 관리자 세션 관리 유틸리티
 * JWT 기반 세션 생성, 검증, 파기 기능 제공
 */

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin-session";
const SESSION_DURATION = 60 * 60 * 24; // 24시간 (초 단위)

/**
 * 세션 페이로드 타입
 */
export interface SessionPayload {
  isAuthenticated: boolean;
  expiresAt: number;
}

/**
 * JWT Secret을 Uint8Array로 변환하여 반환
 * @throws {Error} JWT_SECRET 환경변수가 설정되지 않은 경우
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * 관리자 세션을 생성합니다.
 * @param password - 입력된 관리자 비밀번호
 * @returns 비밀번호가 올바르면 true, 그렇지 않으면 false
 */
export async function createSession(password: string): Promise<boolean> {
  if (password !== process.env.ADMIN_PASSWORD) {
    return false;
  }

  const expiresAt = Date.now() + SESSION_DURATION * 1000;
  const token = await new SignJWT({ isAuthenticated: true, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(expiresAt / 1000)) // JWT exp는 초 단위
    .sign(getJwtSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true, // XSS 공격 방지
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax", // CSRF 공격 완화
    maxAge: SESSION_DURATION,
  });

  return true;
}

/**
 * 현재 요청의 세션을 검증하고 반환합니다.
 * @returns 유효한 세션이 있으면 SessionPayload, 그렇지 않으면 null
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    // 타입 검증 후 명시적 객체 반환
    if (
      typeof payload.isAuthenticated === "boolean" &&
      typeof payload.expiresAt === "number"
    ) {
      return {
        isAuthenticated: payload.isAuthenticated,
        expiresAt: payload.expiresAt,
      };
    }
    return null;
  } catch (error) {
    // JWT 검증 실패 (만료, 변조 등)
    console.error("세션 검증 실패:", error);
    return null;
  }
}

/**
 * 현재 세션을 파기합니다 (로그아웃).
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
