import Link from "next/link";
import { FileX, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 견적서 Not-Found 페이지
 * 잘못된 견적서 ID로 접근 시 표시되는 페이지
 */
export default function InvoiceNotFound() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-16 px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* 에러 아이콘 */}
        <div className="mb-8 text-muted-foreground">
          <FileX className="h-24 w-24" strokeWidth={1.5} />
        </div>

        {/* 메인 메시지 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">견적서를 찾을 수 없습니다</h1>
          <p className="text-lg text-muted-foreground mb-2">
            요청하신 견적서가 존재하지 않거나 삭제되었습니다.
          </p>
          <p className="text-sm text-muted-foreground">
            URL을 다시 확인하시거나 발행자에게 문의해주세요.
          </p>
        </div>

        {/* 안내 카드 */}
        <Card className="w-full max-w-md mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5" />
              발행자 문의 가이드
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div>
              <p className="font-semibold mb-1">다음 사항을 확인해주세요:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>견적서 URL이 정확한지 확인</li>
                <li>견적서 발행자에게 유효한 링크 재요청</li>
                <li>견적서 유효기간 만료 여부 확인</li>
                <li>이메일에 첨부된 원본 링크 사용</li>
              </ul>
            </div>

            <div className="pt-3 border-t">
              <p className="text-muted-foreground">
                문제가 지속되면 발행자에게 직접 문의하시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button asChild variant="default" className="flex-1">
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
