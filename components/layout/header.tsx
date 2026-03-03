import Link from "next/link";
import { ShieldCheck, LayoutDashboard } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/server";

// 헤더 컴포넌트
// 로고, 네비게이션 링크, 관리자 링크, 테마 토글을 포함합니다
export async function Header() {
  // 서버 컴포넌트에서 세션 확인
  const { isAuthenticated } = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl mx-auto items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="rounded-md bg-primary px-2 py-1 text-primary-foreground">
            NK
          </div>
          <span>Next Starter</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            홈
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            기능
          </Link>
          <Link
            href="/invoice/demo-2026-001"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            데모
          </Link>

          {/* 관리자 링크 (인증 상태에 따라 동적 표시) */}
          {isAuthenticated ? (
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/invoices" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                관리자 대시보드
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/login" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                관리자 로그인
              </Link>
            </Button>
          )}
        </nav>

        {/* 테마 토글 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
