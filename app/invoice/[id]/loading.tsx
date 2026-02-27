import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * 견적서 조회 로딩 스켈레톤 UI
 * 실제 견적서 페이지 레이아웃과 동일한 구조
 */
export default function InvoiceLoading() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-8 px-4">
      {/* 견적서 헤더 영역 스켈레톤 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
        <div className="space-y-3">
          {/* 견적서 번호 */}
          <Skeleton className="h-9 w-48" />
          {/* 발행일/유효기간 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-36" />
          </div>
          {/* 상태 배지 */}
          <Skeleton className="h-6 w-20" />
        </div>
        {/* PDF 다운로드 버튼 */}
        <Skeleton className="h-10 w-full md:w-40" />
      </div>

      {/* 발행자/수신자 정보 카드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 발행자 정보 */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardContent>
        </Card>

        {/* 수신자 정보 */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardContent>
        </Card>
      </div>

      {/* 견적 항목 테이블 스켈레톤 */}
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-6 w-20" />
        </CardHeader>
        <CardContent>
          {/* 데스크톱 테이블 뷰 */}
          <div className="hidden md:block space-y-4">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b">
              <Skeleton className="h-4 w-full col-span-5" />
              <Skeleton className="h-4 w-full col-span-2" />
              <Skeleton className="h-4 w-full col-span-2" />
              <Skeleton className="h-4 w-full col-span-3" />
            </div>
            {/* 테이블 행 (3개) */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 py-4 border-b">
                <div className="col-span-5 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <Skeleton className="h-4 w-12 col-span-2" />
                <Skeleton className="h-4 w-20 col-span-2" />
                <Skeleton className="h-4 w-24 col-span-3" />
              </div>
            ))}
          </div>

          {/* 모바일 카드 뷰 */}
          <div className="md:hidden space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="pt-2 border-t">
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 합계 금액 표시 영역 스켈레톤 */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {/* 소계 */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
            </div>
            {/* 세금 */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
            </div>
            {/* 총 금액 */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-36" />
              </div>
            </div>
            {/* 비고 */}
            <div className="pt-4 border-t mt-4 space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
