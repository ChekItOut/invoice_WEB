import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

// 헤더 컴포넌트
// 로고, 네비게이션 링크, 테마 토글을 포함합니다
export function Header() {
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
        <nav className="hidden md:flex gap-6">
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
            href="/smoke-test"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            검증
          </Link>
        </nav>

        {/* 테마 토글 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
