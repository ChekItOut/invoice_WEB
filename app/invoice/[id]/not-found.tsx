import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileX } from "lucide-react";
import Link from "next/link";

// 견적서 404 에러 페이지
export default function NotFound() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-16">
      <Card className="p-12 text-center max-w-md mx-auto">
        {/* 아이콘 */}
        <FileX className="w-16 h-16 mx-auto text-muted-foreground" />

        {/* 메시지 */}
        <h1 className="text-2xl font-bold mt-4">견적서를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mt-2">
          요청하신 견적서가 존재하지 않거나 삭제되었습니다.
        </p>

        {/* 발행자 문의 안내 */}
        <p className="text-sm text-muted-foreground mt-4">
          견적서 발행자에게 올바른 링크를 요청해주세요.
        </p>

        {/* 홈 버튼 */}
        <Button asChild className="mt-6">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </Card>
    </div>
  );
}
