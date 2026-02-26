import Link from "next/link";

// 푸터 컴포넌트
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-8 py-12 max-w-screen-2xl mx-auto">
        {/* 푸터 메인 콘텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 소개 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Next Starter Kit</h3>
            <p className="text-sm text-muted-foreground">
              모던 웹 개발을 위한 완벽한 시작점입니다.
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  shadcn/ui
                </Link>
              </li>
            </ul>
          </div>

          {/* 문서 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">문서</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://nextjs.org/docs"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next.js Docs
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tailwind Docs
                </Link>
              </li>
              <li>
                <Link
                  href="https://ui.shadcn.com/docs"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  shadcn/ui Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* 커뮤니티 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">커뮤니티</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/vercel/next.js"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/nextjs"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Next Starter Kit. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
}
