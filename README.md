# 프로젝트 기술 스택 분석 보고서

## 개요

claude-nextjs-starterkit 프로젝트의 기술 스택을 종합적으로 분석한 결과입니다. 이 문서는 프로젝트에 사용된 모든 핵심 의존성, 버전, 그리고 구성을 다룹니다.

---

## 1. 핵심 프레임워크 및 라이브러리

### 1.1 Next.js 16.1.6

- **사용 위치**: 프로젝트의 핵심 프레임워크
- **현재 버전**: 16.1.6 (2025년 12월 18일 릴리스)
- **최신 버전**: 16.2.0-canary.57 (2026년 2월 21일)
- **상태**: ✅ **안정 버전은 최신**
- **주요 사용처**:
  - App Router 기반 라우팅 (`app/` 디렉토리)
  - 서버 컴포넌트 및 클라이언트 컴포넌트
  - 빌드 및 개발 서버 (`package.json` scripts)
- **설정 파일**: `next.config.ts`
- **참고**: [Next.js 16 공식 블로그](https://nextjs.org/blog/next-16)

### 1.2 React 19.2.3

- **사용 위치**: UI 라이브러리
- **현재 버전**: 19.2.3
- **최신 버전**: 19.2.4 (2026년 1월 26일 릴리스)
- **상태**: ⚠️ **한 버전 뒤처짐** (마이너 패치)
- **주요 사용처**:
  - 모든 컴포넌트 (`app/`, `components/`)
  - React hooks 및 상태 관리
- **참고**: [React Versions](https://react.dev/versions)

### 1.3 TypeScript 5.x

- **사용 위치**: 프로젝트 전체 타입 시스템
- **현재 버전**: ^5 (정확한 버전은 5.x 최신)
- **최신 버전**:
  - TypeScript 6.0 Beta (2026년 2월 11일)
  - TypeScript 7.0 개발 중 (Go 기반 네이티브 포트)
- **상태**: ✅ **현재 버전은 안정적** (v5는 여전히 권장)
- **주요 사용처**:
  - 모든 `.ts`, `.tsx` 파일
  - 경로 별칭: `@/*` (tsconfig.json)
  - 타입 검사: `npm run type-check`
- **설정 파일**: `tsconfig.json`
  - 타겟: ES2017
  - JSX: react-jsx
  - 경로 별칭 설정: `@/*` → `./`
- **참고**: [TypeScript 6.0 발표](https://medium.com/@mernstackdevbykevin/typescript-6-0-in-2026-the-evolution-of-full-stack-javascript-is-here-bd662846a5a2)

---

## 2. 스타일링 및 UI

### 2.1 TailwindCSS 4.x

- **사용 위치**: CSS 프레임워크
- **현재 버전**: ^4
- **최신 버전**: 4.2.0 (최근 5일 이내 릴리스)
- **상태**: ✅ **최신 버전**
- **주요 사용처**:
  - 전역 스타일 (`app/globals.css`)
  - 모든 컴포넌트의 인라인 스타일링
  - 다크모드 테마 변수 (OKLch 색상 공간 사용)
- **설정 파일**: `postcss.config.mjs` (PostCSS 플러그인으로 사용)
- **특징**:
  - Oxide (Rust 기반 컴파일러) 사용
  - 빌드 속도 5배 향상
  - CSS 기반 설정 (JavaScript 설정 파일 불필요)
  - `@theme inline` 문법 지원 (TailwindCSS v4)
- **참고**: [TailwindCSS v4.2 릴리스](https://laravel-news.com/tailwindcss-4-2-0)

### 2.2 PostCSS with @tailwindcss/postcss ^4

- **사용 위치**: CSS 전처리
- **현재 버전**: ^4
- **상태**: ✅ **최신**
- **주요 사용처**:
  - TailwindCSS v4 처리
  - CSS 변환 및 최적화
- **설정 파일**: `postcss.config.mjs`
- **구성**:
  ```javascript
  const config = {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  ```

### 2.3 shadcn/ui 3.8.5

- **사용 위치**: UI 컴포넌트 라이브러리
- **현재 버전**: 3.8.5
- **최신 상태**: ✅ **최신** (2026년 2월 업데이트 포함)
- **주요 사용처**:
  - `components/ui/` 디렉토리
  - 재사용 가능한 UI 컴포넌트
  - CSS import: `@import "shadcn/tailwind.css";`
- **최근 업데이트**:
  - Radix UI와 Base UI 통합 패키지 지원
  - RTL 레이아웃 지원
  - 인라인 스타일 지원
- **CLI**: `npx shadcn@latest add [component-name]`
- **참고**: [shadcn/ui 2026년 2월 업데이트](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui)

### 2.4 Radix UI 1.4.3

- **사용 위치**: 접근성 우선 UI 프리미티브
- **현재 버전**: 1.4.3 (통합 패키지)
- **최신 버전**: 1.4.3
- **상태**: ✅ **최신**
- **주요 사용처**:
  - shadcn/ui의 기반 컴포넌트
  - 접근성 기능 제공 (ARIA 속성)
- **최근 변화**:
  - 통합 `radix-ui` 패키지 도입 (개별 `@radix-ui/react-*` 패키지 대체)
  - Tree-shakable 엔트리포인트
- **참고**: [Radix UI 통합 패키지](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui)

### 2.5 lucide-react 0.564.0

- **사용 위치**: 아이콘 라이브러리
- **현재 버전**: 0.564.0
- **상태**: ✅ **최신** (활발히 업데이트 중)
- **주요 사용처**:
  - UI 아이콘
  - 테마 토글 버튼 등
- **특징**: 2000+ 개의 개방형 소스 SVG 아이콘

---

## 3. 유틸리티 라이브러리

### 3.1 class-variance-authority (CVA) 0.7.1

- **사용 위치**: 조건부 클래스 관리
- **현재 버전**: 0.7.1
- **상태**: ✅ **최신**
- **주요 사용처**:
  - `components/ui/` 컴포넌트의 variant 관리
  - 타입 안전한 스타일 변형
- **용도**: 컴포넌트 props에 따라 조건부 Tailwind 클래스 생성

### 3.2 clsx 2.1.1

- **사용 위치**: 클래스명 결합 유틸리티
- **현재 버전**: 2.1.1
- **상태**: ✅ **최신**
- **주요 사용처**:
  - 조건부 클래스명 생성
- **용도**: 동적 className 생성 시 조건 처리

### 3.3 tailwind-merge 3.4.1

- **사용 위치**: TailwindCSS 클래스 병합
- **현재 버전**: 3.4.1
- **상태**: ✅ **최신**
- **주요 사용처**:
  - `lib/utils.ts`의 `cn()` 함수
  - 중복 클래스 제거 및 최적화
- **용도**: TailwindCSS 클래스 충돌 해결

### 3.4 tw-animate-css 1.4.0

- **사용 위치**: TailwindCSS 애니메이션
- **현재 버전**: 1.4.0
- **상태**: ✅ **최신**
- **주요 사용처**:
  - `app/globals.css`에서 import: `@import "tw-animate-css";`
  - 애니메이션 유틸리티 제공
- **용도**: 추가 애니메이션 클래스 제공

---

## 4. 테마 관리

### 4.1 next-themes 0.4.6

- **사용 위치**: 다크모드 및 테마 관리
- **현재 버전**: 0.4.6
- **상태**: ✅ **최신**
- **주요 사용처**:
  - `components/theme-provider.tsx`
  - `components/theme-toggle.tsx`
  - 라이트/다크/시스템 테마 전환
- **설정**: `app/globals.css`의 CSS 변수
  - 라이트 모드: HSL 기반 색상
  - 다크 모드: OKLch 색상 공간 사용
  - 시스템 테마: OS 설정 자동 감지
- **특징**:
  - SSR 호환
  - 페이지 깜박임 방지
  - 로컬스토리지 기반 테마 저장

---

## 5. 개발 도구

### 5.1 ESLint 9.x

- **사용 위치**: 코드 린팅
- **현재 버전**: ^9
- **최신 버전**:
  - ESLint 9.39.3 (v9 최신 패치)
  - ESLint 10.0.0 (2026년 2월 20일 릴리스)
- **상태**: ⚠️ **메이저 버전 업데이트 가능** (v10 출시됨)
- **주요 사용처**:
  - 코드 품질 검사: `npm run lint`
  - Next.js 규칙 적용
- **설정 파일**: `eslint.config.mjs`
  - `eslint-config-next/core-web-vitals`
  - `eslint-config-next/typescript`
- **사용 규칙**:
  - Core Web Vitals 최적화
  - TypeScript 타입 체크
  - `.next/`, `out/`, `build/`, `next-env.d.ts` 무시
- **참고**: [ESLint v10.0.0 릴리스](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)

### 5.2 eslint-config-next 16.1.6

- **사용 위치**: Next.js ESLint 설정
- **현재 버전**: 16.1.6
- **상태**: ✅ **Next.js 버전과 일치**
- **주요 사용처**:
  - Next.js 특화 린팅 규칙
  - TypeScript 지원
  - Image 최적화 규칙
  - Link 컴포넌트 규칙

### 5.3 Prettier 3.8.1

- **사용 위치**: 코드 포맷터
- **현재 버전**: 3.8.1
- **최신 버전**: 3.8.1 (1개월 전 릴리스)
- **상태**: ✅ **최신**
- **주요 사용처**:
  - 코드 포맷팅: `npm run format`
- **설정 파일**: `.prettierrc.json`
- **설정 값**:
  - 세미콜론 (semi): true
  - 싱글 쿼트 (singleQuote): false (더블 쿼트 사용)
  - 탭 너비 (tabWidth): 2
  - 최대 라인 길이 (printWidth): 80
  - 후행 쉼표 (trailingComma): es5
  - 화살표 함수 괄호 (arrowParens): always
- **참고**: [Prettier 3.8 릴리스](https://prettier.io/blog/2026/01/14/3.8.0)

### 5.4 TypeScript 개발 의존성

- **@types/node**: ^20
- **@types/react**: ^19
- **@types/react-dom**: ^19
- **상태**: ✅ **최신 메이저 버전**
- **주요 사용처**: TypeScript 타입 정의
- **버전 정책**: 각 패키지의 최신 메이저 버전 유지

---

## 6. 프로젝트 구조

```
claude-nextjs-starterkit/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # 루트 레이아웃 (React 19, TypeScript)
│   ├── page.tsx               # 홈페이지
│   ├── globals.css            # TailwindCSS v4 설정
│   │                           # - @import "tailwindcss"
│   │                           # - @import "tw-animate-css"
│   │                           # - @import "shadcn/tailwind.css"
│   │                           # - CSS 변수 정의 (라이트/다크)
│   │                           # - @theme inline (TailwindCSS v4)
│   └── favicon.ico
│
├── components/                 # React 컴포넌트
│   ├── layout/                # 레이아웃 컴포넌트
│   ├── ui/                    # shadcn/ui 컴포넌트 (Radix UI 기반)
│   │   └── [component-name].tsx
│   ├── theme-provider.tsx     # next-themes 프로바이더
│   └── theme-toggle.tsx       # 테마 토글 (lucide-react 아이콘)
│
├── lib/
│   └── utils.ts               # 유틸리티
│       └── cn() 함수 (clsx + tailwind-merge)
│
├── public/                    # 정적 에셋
│
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
│   └── 경로 별칭: @/* → ./
│
├── next.config.ts             # Next.js 설정
├── postcss.config.mjs          # PostCSS/TailwindCSS 설정
├── eslint.config.mjs           # ESLint 설정
│   └── Next.js Core Web Vitals + TypeScript
│
└── .prettierrc.json            # Prettier 설정
    └── 세미콜론: true, 라인: 80
```

---

## 7. 버전 상태 요약

### ✅ 최신 버전 (9개)

1. **Next.js 16.1.6** (안정 버전 최신)
2. **TailwindCSS 4.x** (v4.2.0 포함)
3. **shadcn/ui 3.8.5**
4. **Radix UI 1.4.3**
5. **Prettier 3.8.1**
6. **TypeScript 5.x** (안정 버전)
7. **class-variance-authority 0.7.1**
8. **clsx 2.1.1**
9. **tailwind-merge 3.4.1**

### ⚠️ 업데이트 권장 (2개)

1. **React 19.2.3 → 19.2.4** (마이너 패치 - 안정성 개선)
2. **ESLint 9.x → 10.0.0** (메이저 버전 - 선택적)

---

## 8. 주요 기술 결정

### 8.1 프레임워크

- **Next.js 16**: App Router 기반 현대적 웹 프레임워크
  - 서버 컴포넌트 지원
  - 빌드 최적화
  - 자동 코드 분할
- **React 19**: 최신 React 기능 활용
  - use() hook
  - Server Actions
  - 개선된 성능

### 8.2 스타일링

- **TailwindCSS v4**: Rust 기반 고성능 CSS 프레임워크
  - 5배 빠른 빌드 속도
  - CSS 기반 설정
  - OKLch 색상 공간 지원
- **shadcn/ui + Radix UI**: 접근성 우선 컴포넌트 시스템
  - ARIA 기반 접근성
  - 완전 커스터마이징 가능
  - 번들 크기 최소화

### 8.3 개발 경험

- **TypeScript 5**: 강력한 타입 안전성
  - 경로 별칭: `@/*`
  - 엄격한 타입 검사
  - 증분 컴파일
- **ESLint + Prettier**: 코드 품질 및 일관성 유지
  - Next.js Core Web Vitals 적용
  - 자동 포맷팅
  - 일관된 스타일

### 8.4 테마

- **next-themes**: 라이트/다크/시스템 테마 지원
  - SSR 안전
  - 페이지 깜박임 방지
  - LocalStorage 기반 저장
- **CSS 변수 기반**: 유연한 테마 커스터마이징
  - HSL/OKLch 색상 지원
  - 런타임 테마 전환
  - 접근성 고려

---

## 9. npm 스크립트

```json
{
  "dev": "next dev",           // 개발 서버 시작
  "build": "next build",        // 프로덕션 빌드
  "start": "next start",        // 프로덕션 서버 시작
  "lint": "eslint .",           // 코드 린팅
  "format": "prettier --write .", // 코드 포맷팅
  "type-check": "tsc --noEmit"  // TypeScript 타입 검사
}
```

---

## 10. 권장 사항

### 🔴 즉시 업데이트

**React 19.2.3 → 19.2.4** (안정성 패치)

```bash
npm install react@19.2.4 react-dom@19.2.4
```

### 🟡 선택적 업데이트

**ESLint 9 → 10** (메이저 버전)
- 현재 v9도 안정적이므로 급하지 않음
- v10의 새로운 기능이 필요할 때 업데이트
- Breaking changes 확인 필요

### ✅ 유지 관리

- 정기적으로 `npm outdated` 실행하여 패키지 상태 확인
- 메이저 버전 업데이트 전 changelog 확인
- 월 1회 이상 의존성 검토

---

## 11. 설정 파일 참고

### package.json

```json
{
  "dependencies": {
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "typescript": "^5",
    "eslint": "^9",
    "prettier": "^3.8.1"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### .prettierrc.json

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 12. 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 버전 정보](https://react.dev/versions)
- [TailwindCSS v4 가이드](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Radix UI 문서](https://radix-ui.com)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [ESLint v10 릴리스 노트](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)
- [Prettier 문서](https://prettier.io/docs)

---

## 13. 라이센스 및 버전 정보

- **프로젝트 버전**: 0.1.0
- **문서 작성일**: 2026년 2월 24일
- **마지막 업데이트**: 2026년 2월 24일

---

## 질문 및 피드백

이 문서에 대한 질문이나 업데이트가 필요한 경우, 프로젝트 관리자에게 연락하세요.
