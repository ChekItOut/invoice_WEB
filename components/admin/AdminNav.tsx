/**
 * 관리자 네비게이션 바 컴포넌트
 * 로고, 메뉴, 로그아웃 버튼 포함
 */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  // 네비게이션 메뉴 항목
  const navItems = [{ href: "/admin/invoices", label: "견적서 목록" }];

  return (
    <nav className="border-b bg-background">
      <div className="container max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 및 메뉴 */}
          <div className="flex items-center gap-6">
            <Link href="/admin/invoices" className="font-bold text-lg">
              관리자
            </Link>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <Button variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </nav>
  );
}
