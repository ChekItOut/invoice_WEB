# Invoice Web 개발 가이드 (AI Agent용)

> **중요:** 이 문서는 AI Agent의 코딩 작업을 위한 프로젝트 특화 규칙입니다. 일반 개발 지식은 포함하지 않습니다.

## 프로젝트 개요

- **목적**: Notion 데이터베이스 기반 견적서 관리 시스템
- **기술 스택**: Next.js 16.1.6 (App Router), TypeScript 5, React 19, TailwindCSS v4
- **UI 라이브러리**: shadcn/ui, Radix UI, lucide-react
- **주요 기능**: Notion API 연동, 견적서 웹 조회, PDF 다운로드
- **언어 규칙**: 한국어 주석/커밋 메시지, 영어 변수명/함수명

## 파일 구조 및 라우팅 규칙

### 새 페이지 추가

```
app/
├── [route-name]/
│   └── page.tsx          # 새 페이지는 반드시 이 패턴으로 생성
```

**규칙:**

- 새 페이지는 `app/[route-name]/page.tsx` 형식으로 생성
- 동적 라우트는 `app/[param]/page.tsx` 형식 사용
- 레이아웃 공유가 필요하면 `app/[route-name]/layout.tsx` 추가

**✅ 올바른 예:**

```
app/invoices/page.tsx           # /invoices 페이지
app/invoices/[id]/page.tsx      # /invoices/:id 동적 페이지
```

**❌ 잘못된 예:**

```
pages/invoices.tsx              # Pages Router 방식 (금지)
app/invoices.tsx                # 파일 직접 생성 (금지)
```

### API 라우트 추가

```
app/
├── api/
│   └── [route-name]/
│       └── route.ts          # API 엔드포인트는 반드시 이 패턴으로 생성
```

**규칙:**

- API 엔드포인트는 `app/api/[route-name]/route.ts` 형식으로 생성
- export 함수명: GET, POST, PUT, PATCH, DELETE (대문자)
- Notion API 호출은 반드시 API 라우트에서만 수행

**✅ 올바른 예:**

```typescript
// app/api/invoices/route.ts
export async function GET(request: Request) {
  // Notion API 호출
}
```

### 컴포넌트 배치

```
components/
├── layout/               # 레이아웃 컴포넌트 (Header, Footer 등)
├── ui/                   # shadcn/ui 컴포넌트 (자동 생성, 수동 수정 금지)
└── [feature-name].tsx    # 기능별 재사용 컴포넌트
```

**규칙:**

- 레이아웃 컴포넌트는 `components/layout/` 디렉토리에 배치
- UI 컴포넌트는 shadcn CLI로만 추가 (`npx shadcn@latest add [component-name]`)
- 재사용 컴포넌트는 `components/` 루트에 배치

**⚠️ 금지:**

- `components/ui/` 디렉토리에 수동으로 파일 생성

## 경로 별칭 규칙

### @/ 별칭 강제 사용

**규칙:**

- 모든 import는 `@/` 별칭을 사용
- 상대 경로 import는 절대 금지
- `@/`는 프로젝트 루트를 가리킴 (tsconfig.json 정의)

**✅ 올바른 예:**

```typescript
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
```

**❌ 잘못된 예:**

```typescript
import { Button } from "../../../components/ui/button";
import { Header } from "../../layout/header";
import { cn } from "../lib/utils";
```

## 컴포넌트 개발 규칙

### Server Component vs Client Component

**기본 원칙:**

- **기본값은 Server Component** (파일 상단에 아무것도 선언하지 않음)
- **상호작용이 필요할 때만** `"use client"` 선언

**Client Component 필요 조건:**

- useState, useEffect, useContext 등 React Hooks 사용
- onClick, onChange 등 이벤트 핸들러 사용
- Browser API 사용 (window, document, localStorage 등)
- next-themes의 useTheme 훅 사용

**✅ Server Component (기본):**

```typescript
// app/invoices/page.tsx
export default function InvoicesPage() {
  // 데이터 페칭, DB 접근 가능
  return <div>...</div>;
}
```

**✅ Client Component (상호작용 필요):**

```typescript
// components/invoice-form.tsx
"use client";

import { useState } from "react";

export function InvoiceForm() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 컴포넌트 작성 패턴

**규칙:**

- TypeScript 인터페이스로 props 타입 정의
- 주석은 한국어로 작성
- 변수명/함수명은 영어로 작성
- 컴포넌트 내부에 주석으로 섹션 구분

**✅ 올바른 예:**

```typescript
// 견적서 카드 컴포넌트
interface InvoiceCardProps {
  title: string;
  amount: number;
  status: "pending" | "paid";
}

export function InvoiceCard({ title, amount, status }: InvoiceCardProps) {
  return (
    <div className="p-4">
      {/* 제목 */}
      <h3>{title}</h3>

      {/* 금액 */}
      <p>{amount}</p>

      {/* 상태 */}
      <span>{status}</span>
    </div>
  );
}
```

## 스타일링 규칙

### TailwindCSS 사용 규칙

**레이아웃 중앙 정렬 패턴:**

```typescript
// ✅ 필수 패턴
<section className="py-16">
  <div className="container max-w-screen-2xl mx-auto">
    {/* 콘텐츠 */}
  </div>
</section>
```

**규칙:**

- 섹션 컨테이너는 반드시 `container max-w-screen-2xl mx-auto` 포함
- `mx-auto` 없으면 왼쪽 치우침 발생
- `container`는 TailwindCSS 기본 클래스 (자동 패딩 포함)

### className 병합

**cn() 함수 사용:**

```typescript
import { cn } from "@/lib/utils";

// ✅ 올바른 예
<button
  className={cn(
    "px-4 py-2 bg-primary text-white rounded",
    isActive && "bg-primary/80",
    className // props로 받은 className 병합
  )}
/>

// ❌ 잘못된 예
<button className={`px-4 py-2 ${isActive ? 'active' : ''} ${className}`} />
```

### shadcn/ui 컴포넌트 추가

**규칙:**

- shadcn/ui 컴포넌트는 CLI로만 추가
- 명령어: `npx shadcn@latest add [component-name]`
- 자동으로 `components/ui/` 디렉토리에 설치됨

**✅ 올바른 사용:**

```bash
npx shadcn@latest add alert-dialog
npx shadcn@latest add tabs
npx shadcn@latest add form
```

**❌ 금지:**

```typescript
// components/ui/my-component.tsx 직접 생성 (금지)
```

## 테마 시스템 규칙

### CSS 변수 수정

**규칙:**

- 색상 변경은 `app/globals.css`의 CSS 변수만 수정
- 새 색상 추가 시 `:root`와 `.dark` 모두 정의
- HSL 색상 형식 사용 (예: `240 5.9% 10%`)

**✅ 올바른 예:**

```css
/* app/globals.css */
:root {
  --primary: 240 5.9% 10%; /* 라이트 모드 */
  --primary-foreground: 0 0% 98%;
}

.dark {
  --primary: 0 0% 98%; /* 다크 모드 */
  --primary-foreground: 240 5.9% 10%;
}
```

**❌ 금지:**

```css
/* 하나만 정의 (금지) */
:root {
  --primary: 240 5.9% 10%;
}
/* .dark 정의 누락 → 다크 모드에서 색상 깨짐 */
```

### suppressHydrationWarning 유지

**규칙:**

- `app/layout.tsx`의 `<html>` 태그에 `suppressHydrationWarning` 속성 유지 필수
- 이 속성을 제거하면 테마 관련 hydration 경고 발생

**✅ 필수 유지:**

```typescript
// app/layout.tsx
<html lang="ko" suppressHydrationWarning>
  {/* ... */}
</html>
```

**❌ 금지:**

```typescript
<html lang="ko">  {/* suppressHydrationWarning 제거 금지 */}
```

### TailwindCSS v4 설정

**규칙:**

- TailwindCSS v4는 CSS에서 직접 설정
- `tailwind.config.js` 파일 생성 금지
- 커스터마이징은 `app/globals.css`의 `@theme` 블록에서만 수행

**✅ 올바른 예:**

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
}
```

**❌ 금지:**

```javascript
// tailwind.config.js 생성 (금지)
module.exports = {
  theme: {
    extend: {},
  },
};
```

## Notion API 연동 규칙

### API 호출 위치

**규칙:**

- Notion API는 반드시 **API 라우트**에서만 호출
- Server Component에서도 가능하지만 API 라우트 권장
- Client Component에서 직접 호출 절대 금지

**✅ 올바른 예:**

```typescript
// app/api/notion/invoices/route.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return Response.json(response);
}
```

**❌ 금지:**

```typescript
// components/invoice-list.tsx (Client Component)
"use client";

import { Client } from "@notionhq/client"; // 금지!

export function InvoiceList() {
  // Client Component에서 Notion API 호출 금지
}
```

### 환경 변수

**필수 환경 변수:**

- `NOTION_API_KEY`: Notion Integration 토큰
- `NOTION_DATABASE_ID`: 견적서 데이터베이스 ID

**규칙:**

- `.env.local` 파일에 정의
- API 라우트에서만 접근 가능 (`process.env`)

## PDF 생성 규칙

### React PDF 사용

**규칙:**

- `@react-pdf/renderer` 라이브러리 사용
- PDF 생성은 API 라우트에서 수행
- 클라이언트에서 다운로드 버튼 클릭 시 API 호출

**패턴:**

```typescript
// app/api/invoices/[id]/pdf/route.ts
import { Document, Page, Text, pdf } from "@react-pdf/renderer";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Notion에서 데이터 가져오기

  // PDF 문서 생성
  const doc = (
    <Document>
      <Page>
        <Text>견적서</Text>
      </Page>
    </Document>
  );

  // PDF 스트림 생성
  const pdfStream = await pdf(doc).toBlob();

  // Response 반환
  return new Response(pdfStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${params.id}.pdf"`,
    },
  });
}
```

## 금지 사항

### 절대 금지

**⚠️ 다음 행위는 절대 금지:**

1. **상대 경로 import 사용**

   ```typescript
   // ❌ 금지
   import { Button } from "../../../components/ui/button";
   ```

2. **tailwind.config.js 파일 생성**
   - TailwindCSS v4는 CSS에서 설정

3. **components/ui/ 디렉토리에 수동 파일 생성**
   - shadcn CLI로만 추가

4. **suppressHydrationWarning 속성 제거**

   ```typescript
   // ❌ 금지
   <html lang="ko">  // suppressHydrationWarning 제거 금지
   ```

5. **Client Component에서 Notion API 직접 호출**
   - API 라우트 또는 Server Component에서만 호출

6. **CSS 변수 수정 시 :root만 변경**
   - `.dark`도 함께 수정 필수

7. **일반 개발 지식 포함**
   - React 기초, TypeScript 기본 등은 문서에 포함하지 않음

## 다중 파일 수정 시나리오

### Header 네비게이션 링크 추가

**함께 수정해야 할 파일:**

1. `components/layout/header.tsx` - 링크 추가
2. `app/[route]/page.tsx` - 해당 페이지 생성

**예시:**

```typescript
// 1. components/layout/header.tsx
<Link href="/about">소개</Link>

// 2. app/about/page.tsx 생성
export default function AboutPage() {
  return <div>소개 페이지</div>;
}
```

### 메타데이터 변경

**수정 위치:**

- `app/layout.tsx`의 `metadata` 객체만 수정

**예시:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "견적서 관리 시스템",
  description: "새로운 설명",
  keywords: ["견적서", "invoice"],
};
```

### 전역 색상 변경

**함께 수정해야 할 CSS 블록:**

1. `:root` 블록 - 라이트 모드
2. `.dark` 블록 - 다크 모드

**예시:**

```css
/* app/globals.css */
:root {
  --primary: 200 100% 50%; /* 새 primary 색상 */
}

.dark {
  --primary: 200 100% 50%; /* 다크 모드도 함께 변경 */
}
```

## AI 의사결정 우선순위

### 1. 컴포넌트 타입 결정

**의사결정 트리:**

```
상호작용(useState/useEffect/onClick) 필요?
├─ YES → "use client" 추가
└─ NO → Server Component 유지
```

### 2. 파일 배치 결정

**의사결정 트리:**

```
무엇을 만드는가?
├─ 페이지 → app/[route]/page.tsx
├─ API → app/api/[route]/route.ts
├─ 레이아웃 컴포넌트 → components/layout/[name].tsx
├─ shadcn/ui 컴포넌트 → npx shadcn@latest add [name]
└─ 재사용 컴포넌트 → components/[name].tsx
```

### 3. 스타일링 방법 결정

**의사결정 트리:**

```
스타일링 방법?
├─ 기존 shadcn 컴포넌트 있음 → 재사용
├─ 조건부 스타일링 필요 → cn() 함수 사용
├─ 전역 색상 변경 → globals.css CSS 변수 수정
└─ 새 섹션 추가 → container max-w-screen-2xl mx-auto 패턴
```

### 4. API 호출 위치 결정

**의사결정 트리:**

```
Notion API 호출?
├─ Server Component → 가능하지만 API 라우트 권장
├─ API Route → ✅ 권장
└─ Client Component → ❌ 절대 금지
```

---

## 문서 업데이트 규칙

**이 문서는 프로젝트 진행에 따라 업데이트해야 합니다:**

- 새로운 패턴 발견 시 즉시 추가
- 변경된 규칙은 즉시 수정
- 더 이상 유효하지 않은 규칙은 삭제
- 프로젝트 특화 규칙만 유지 (일반 지식 제외)
