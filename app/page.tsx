import { FileText, Download, Database, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 기능 아이템 인터페이스
interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// 핵심 기능 목록
const features: FeatureItem[] = [
  {
    title: "노션 데이터베이스 연동",
    description:
      "Notion API를 통해 견적서 데이터를 실시간으로 조회하고 관리합니다.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "견적서 웹 조회",
    description:
      "고유 URL을 통해 클라이언트가 언제 어디서나 견적서를 확인할 수 있습니다.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "PDF 다운로드",
    description:
      "원클릭으로 견적서를 PDF 파일로 다운로드하여 저장하거나 인쇄할 수 있습니다.",
    icon: <Download className="w-6 h-6" />,
  },
  {
    title: "빠르고 안정적",
    description:
      "Next.js 16과 TypeScript로 구축된 빠르고 안정적인 시스템입니다.",
    icon: <Zap className="w-6 h-6" />,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="space-y-8 py-16 md:py-24">
        <div className="container max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-4 mx-auto max-w-3xl text-center">
            {/* 소제목 */}
            <div className="flex items-center gap-2 w-fit rounded-full border border-border bg-muted px-4 py-1 mx-auto">
              <span className="text-xs font-semibold text-primary uppercase">
                노션 기반 견적서 시스템
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              견적서 관리를
              <br />더 쉽고 빠르게
            </h1>

            {/* 설명 */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트에게
              고유 링크로 공유하세요. 웹에서 바로 확인하고 PDF로 다운로드할 수
              있습니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="text-base">
                <Link href="/invoices" className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  데모 견적서 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 작동 방식 섹션 */}
      <section className="space-y-12 py-16 md:py-24 border-t">
        <div className="container max-w-screen-2xl mx-auto">
          <div className="mb-12 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              간단한 3단계
            </h2>
            <p className="text-lg text-muted-foreground">
              복잡한 설정 없이 바로 시작할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border border-border text-center">
              <div className="mb-4 text-primary text-4xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">
                노션에서 견적서 작성
              </h3>
              <p className="text-sm text-muted-foreground">
                노션 데이터베이스에 견적서 정보를 입력합니다.
              </p>
            </Card>

            <Card className="p-6 border border-border text-center">
              <div className="mb-4 text-primary text-4xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">고유 링크 전달</h3>
              <p className="text-sm text-muted-foreground">
                자동 생성된 고유 URL을 클라이언트에게 공유합니다.
              </p>
            </Card>

            <Card className="p-6 border border-border text-center">
              <div className="mb-4 text-primary text-4xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">웹에서 조회</h3>
              <p className="text-sm text-muted-foreground">
                클라이언트가 웹에서 확인하고 PDF로 다운로드합니다.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features 섹션 */}
      <section id="features" className="space-y-12 py-16 md:py-24 border-t">
        <div className="container max-w-screen-2xl mx-auto">
          <div className="mb-12 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              핵심 기능
            </h2>
            <p className="text-lg text-muted-foreground">
              견적서 관리에 필요한 모든 것을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="space-y-8 py-16 md:py-24 border-t">
        <div className="container max-w-screen-2xl mx-auto">
          <div className="rounded-lg border border-border bg-card p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                최신 기술 스택
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Next.js 16, TypeScript, TailwindCSS v4, Notion API로 구축된
                안정적인 시스템입니다.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  Next.js 16
                </span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  TypeScript
                </span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  React 19
                </span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  Notion API
                </span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  TailwindCSS v4
                </span>
                <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">
                  shadcn/ui
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
