"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 전역 에러 바운더리
 * 애플리케이션에서 발생하는 예상치 못한 에러 처리
 *
 * @param error - 발생한 에러 객체
 * @param reset - 에러 상태를 초기화하고 컴포넌트 재렌더링 함수
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 콘솔에 로깅 (프로덕션에서는 에러 추적 서비스로 전송)
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <div className="container max-w-screen-2xl mx-auto py-16 px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* 에러 아이콘 */}
        <div className="mb-8 text-destructive">
          <AlertCircle className="h-24 w-24" strokeWidth={1.5} />
        </div>

        {/* 메인 메시지 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">문제가 발생했습니다</h1>
          <p className="text-lg text-muted-foreground mb-2">
            예상치 못한 오류로 인해 페이지를 표시할 수 없습니다.
          </p>
          <p className="text-sm text-muted-foreground">
            문제가 지속되면 관리자에게 문의해주세요.
          </p>
        </div>

        {/* 에러 상세 정보 카드 */}
        <Card className="w-full max-w-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              에러 상세 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-mono text-xs break-all">
                {error.message || "알 수 없는 오류가 발생했습니다."}
              </p>
              {error.digest && (
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">해결 방법:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>페이지를 새로고침해보세요</li>
                <li>브라우저 캐시를 삭제해보세요</li>
                <li>잠시 후 다시 시도해보세요</li>
                <li>다른 브라우저에서 시도해보세요</li>
              </ul>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground font-mono">
                  개발 모드: 자세한 에러 정보는 콘솔을 확인하세요.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button
            onClick={reset}
            variant="default"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            다시 시도
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
