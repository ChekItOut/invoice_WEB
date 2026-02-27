import { Skeleton } from "@/components/ui/skeleton";

// 견적서 조회 로딩 스켈레톤 UI
export default function Loading() {
  return (
    <div className="container max-w-screen-2xl mx-auto py-8">
      {/* 헤더 영역 스켈레톤 */}
      <Skeleton className="h-12 w-64 mb-8" />

      {/* 정보 카드 영역 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>

      {/* 테이블 영역 스켈레톤 */}
      <Skeleton className="h-64 mt-8" />
    </div>
  );
}
