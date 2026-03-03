/**
 * 관리자 관련 타입 정의
 */

import type { InvoiceStatus } from "./invoice";

/**
 * 관리자 세션 페이로드
 */
export interface AdminSession {
  isAuthenticated: boolean;
  expiresAt: number;
}

/**
 * 견적서 필터 옵션
 */
export interface FilterOptions {
  /** 검색어 (견적서 번호 또는 클라이언트명) */
  searchTerm?: string;
  /** 상태 필터 (전체 또는 특정 상태) */
  statusFilter?: InvoiceStatus | "all";
  /** 날짜 범위 필터 */
  dateRange?: {
    start: Date;
    end: Date;
  } | null;
}
