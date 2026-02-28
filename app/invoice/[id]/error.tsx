"use client";

import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
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
 * 견적서 페이지 에러 바운더리
 * Notion API 호출 실패 등 런타임 에러를 사용자 친화적으로 표시합니다.
 */
export default function InvoiceError({ error, reset }: ErrorPageProps) {
  return (
    <div className="container max-w-screen-2xl mx-auto py-16 px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* 에러 아이콘 */}
        <div className="mb-8 text-destructive">
          <AlertCircle className="h-24 w-24" strokeWidth={1.5} />
        </div>

        {/* 메인 메시지 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            오류가 발생했습니다
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            견적서를 불러오는 중 문제가 발생했습니다.
          </p>
        </div>

        {/* 에러 상세 카드 */}
        <Card className="w-full max-w-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg">오류 정보</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p className="text-destructive">{error.message}</p>
            <div className="pt-3 border-t">
              <p className="text-muted-foreground">
                문제가 지속되면 페이지를 새로고침하거나, 잠시 후 다시
                시도해주세요.
              </p>
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
