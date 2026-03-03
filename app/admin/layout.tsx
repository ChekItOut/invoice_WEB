/**
 * 관리자 전용 레이아웃
 * 모든 /admin/* 페이지에 적용됨
 */

import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 네비게이션 바 */}
      <AdminNav />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
