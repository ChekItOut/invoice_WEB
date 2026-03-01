"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 견적서 목록 페이지 에러 바운더리
 * Notion API 호출 실패, 네트워크 오류 등 런타임 에러를 사용자 친화적으로 표시합니다.
 *
 * Next.js 규칙:
 * - "use client" 필수
 * - error, reset props를 받아 처리
 * - 같은 세그먼트의 layout.tsx로 자동 래핑됨
 */
export default function InvoicesError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 에러 추적 서비스로 전송 가능)
    console.error("[견적서 목록] 에러 발생:", error);
  }, [error]);

  return (
    <div className="container max-w-screen-2xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* 에러 아이콘 */}
        <div className="mb-8 text-destructive">
          <AlertCircle className="h-20 w-20 md:h-24 md:w-24" strokeWidth={1.5} />
        </div>

        {/* 메인 메시지 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            견적서 목록을 불러올 수 없습니다
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            데이터를 가져오는 중 문제가 발생했습니다.
          </p>
        </div>

        {/* 에러 상세 카드 */}
        <Card className="w-full max-w-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              오류 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            {/* 에러 메시지 */}
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

            {/* 해결 방법 안내 */}
            <div className="pt-3 border-t">
              <p className="font-semibold mb-2">확인해보세요:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>인터넷 연결 상태를 확인해주세요</li>
                <li>잠시 후 다시 시도해주세요</li>
                <li>문제가 지속되면 관리자에게 문의해주세요</li>
              </ul>
            </div>
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
            <Link
              href="/"
              className="flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
