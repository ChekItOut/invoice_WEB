/**
 * 디바운싱 커스텀 훅
 * 함수 호출을 지연시켜 성능 최적화
 */

"use client";

import { useRef, useCallback } from "react";

/**
 * 디바운싱된 콜백 함수를 반환합니다.
 * @param callback - 디바운싱할 함수
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운싱된 함수
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      // 이전 타이머가 있으면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새 타이머 설정
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}
