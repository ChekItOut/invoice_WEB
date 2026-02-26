# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 환경 및 주요 명령어

### 개발 및 빌드

```bash
# 개발 서버 실행 (Hot reload 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 애플리케이션 실행
npm run start
```

### 코드 품질

```bash
# ESLint로 코드 검사
npm run lint

# Prettier로 코드 포맷팅
npm run format

# TypeScript 타입 검사 (emit 없음)
npm run type-check
```

---

## 아키텍처

### 기술 스택

- **프레임워크**: Next.js 16.1.6 (App Router 기반)
- **언어**: TypeScript 5
- **스타일링**: TailwindCSS v4 + shadcn/ui
- **UI 라이브러리**: Radix UI, lucide-react (아이콘)
- **테마**: next-themes (다크모드 지원)
- **개발 도구**: ESLint 9, Prettier 3

### 프로젝트 레이아웃

```
app/                       # Next.js App Router (최신 라우팅 방식)
├── layout.tsx            # 루트 레이아웃 (Header, Footer, ThemeProvider 포함)
├── page.tsx              # 홈 페이지
├── globals.css           # 전역 스타일 및 CSS 변수 (테마 색상 포함)
└── api/                  # API 라우트 (필요시)

components/               # 재사용 가능한 React 컴포넌트
├── layout/
│   ├── header.tsx        # 고정 헤더 (네비게이션 + 테마 토글)
│   └── footer.tsx        # 푸터 (링크 그리드)
├── ui/                   # shadcn/ui 컴포넌트 (Button, Card 등)
├── theme-provider.tsx    # next-themes 프로바이더 설정
└── theme-toggle.tsx      # 다크/라이트 모드 전환 버튼

lib/
└── utils.ts              # 유틸리티 함수 (cn() 등 Tailwind 병합)

public/                   # 정적 에셋 (이미지, 폰트 등)

tsconfig.json             # TypeScript 설정 (경로 별칭 @/ 정의)
next.config.ts            # Next.js 설정 (비어있음, 필요시 추가)
eslint.config.mjs         # ESLint 설정 (next/core-web-vitals, typescript 포함)
.prettierrc.json          # Prettier 설정 (80자 line width)
postcss.config.mjs        # PostCSS 설정 (@tailwindcss/postcss 플러그인)
```

### 레이아웃 구조

```typescript
// app/layout.tsx의 기본 구조
<html>
  <body>
    <ThemeProvider>              {/* 테마 상태 관리 */}
      <Header />                 {/* 고정 헤더 (sticky) */}
      <main>
        {children}               {/* 페이지별 콘텐츠 */}
      </main>
      <Footer />                 {/* 페이지 하단 */}
    </ThemeProvider>
  </body>
</html>
```

---

## 코드 스타일 및 규칙

### 경로 별칭

`@/` 별칭은 `src/` 디렉토리 루트를 가리킵니다 (tsconfig.json 설정).

```typescript
// ✅ 권장
import { Button } from "@/components/ui/button";
import { utils } from "@/lib/utils";

// ❌ 피할 것
import { Button } from "../../../components/ui/button";
```

### 컴포넌트 작성 패턴

- **Server Components**: 기본 설정. 데이터 페칭, DB 접근 시 사용
- **Client Components**: 상호작용 필요 시 파일 상단에 `"use client"` 선언
- **명시적 타입 지정**: TypeScript의 장점을 활용한 타입 안전성 확보

```typescript
// 서버 컴포넌트 (기본)
export default function Page() {
  return <div>...</div>;
}

// 클라이언트 컴포넌트 (상호작용 필요)
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Tailwind CSS 스타일링

TailwindCSS v4는 설정 파일이 선택사항입니다. 기본 설정만으로도 충분하며, 필요한 경우만 PostCSS에서 커스터마이징하세요.

```typescript
// 클래스 병합 (중복 제거)
import { cn } from "@/lib/utils"; // class-variance-authority 사용

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-primary text-white rounded",
        className
      )}
      {...props}
    />
  );
}
```

### 코드 포맷팅

- **ESLint**: `npm run lint` (Next.js + TypeScript 규칙)
- **Prettier**: `npm run format` (80자 line width, 2칸 indent)
- **자동 검사**: TypeScript 타입 안전성은 `npm run type-check`로 검증

---

## shadcn/ui 컴포넌트 추가

기존 shadcn/ui 컴포넌트는 `components/ui/` 폴더에 있습니다 (Button, Card 등).

새 컴포넌트 추가:

```bash
npx shadcn@latest add [component-name]
# 예: npx shadcn@latest add alert-dialog
```

컴포넌트는 자동으로 `components/ui/` 폴더에 설치되며, 즉시 사용 가능합니다.

---

## 테마 시스템

### 다크모드 구현

`next-themes`를 사용하며, 색상 변수는 `app/globals.css`에서 정의:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* 기타 색상 변수 */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

### 테마 토글

헤더의 `<ThemeToggle />` 버튼으로 다크/라이트 모드 전환 가능. 선택 사항으로 시스템 테마 따르기도 지원.

---

## 페이지 추가 및 라우팅

Next.js App Router 사용 (파일 기반 라우팅):

```
app/
├── page.tsx              # / (홈)
├── about/
│   └── page.tsx          # /about
├── contact/
│   └── page.tsx          # /contact
└── api/
    └── hello/
        └── route.ts      # /api/hello (API 엔드포인트)
```

---

## 주의사항

1. **레이아웃 중앙 정렬**: 섹션 컨테이너에 `container max-w-screen-2xl mx-auto` 클래스 사용 (왼쪽 치우침 방지)
2. **hydration 문제**: 테마 프로바이더의 `suppressHydrationWarning` 속성 유지
3. **글꼴**: Google Fonts (Geist, Geist Mono)는 런타임에 로드되므로 폰트 파일 최적화 자동 처리됨
4. **PostCSS 필수**: TailwindCSS v4 사용 시 `postcss.config.mjs`는 필수 설정 파일

---

## 코드 작성 규칙 (Global CLAUDE.md 참조)

- **언어**: 한국어 (주석, 커밋 메시지)
- **변수/함수명**: 영어 (코드 표준 준수)
- **타입 안전성**: TypeScript 활용하여 런타임 오류 사전 방지
