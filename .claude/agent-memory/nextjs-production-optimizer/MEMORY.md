# Next.js Production Optimizer 메모리

## 최적화 패턴 및 경험

### 일반적인 스타터 템플릿 불필요 요소

#### 제거해야 할 파일 패턴

- `app/(examples)/` - 예제 페이지 디렉토리
- `components/smoke-test/` - 데모 컴포넌트
- `public/*.svg` - Next.js/Vercel 기본 로고 파일 (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

#### 불필요한 의존성 패턴

- **html2canvas + jspdf**: 구형 PDF 생성 방식, `@react-pdf/renderer`로 대체 권장
- **radix-ui**: 통합 패키지 (1.4.3+) 사용 시 개별 `@radix-ui/react-*` 패키지 불필요

### 프로젝트별 최적화 (invoice-web)

#### 유지해야 할 핵심 요소

- **레이아웃 시스템**: Header, Footer, ThemeProvider (재사용 가능)
- **UI 컴포넌트**: Button, Card, Dialog, Input 등 (shadcn/ui 기반)
- **테마 시스템**: next-themes (다크모드 필수)
- **유틸리티**: lib/utils.ts의 cn() 함수 (clsx + tailwind-merge)

#### 의존성 선택 기준

- **PDF 생성**: `@react-pdf/renderer` (React 컴포넌트 기반, SSR 지원)
- **Notion API**: `@notionhq/client` (공식 SDK, 타입 안전)
- **스타일링**: TailwindCSS v4 (Rust 기반, 5배 빠른 빌드)

### 검증 프로세스

#### 필수 검증 단계 (순서대로)

1. `npm run type-check` - TypeScript 오류 0개 확인
2. `npm run lint` - ESLint 경고 0개 확인
3. `npm run build` - 프로덕션 빌드 성공 확인

#### 빌드 성공 기준

- Turbopack 컴파일 성공
- Static 페이지 생성 완료
- TypeScript 타입 검사 통과

### 환경 설정 체크리스트

#### .env.example 필수 항목

```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

#### .gitignore 패턴

- `.env*` 전체 제외
- `!.env.example` 예외로 포함

### 최적화 결과 지표

#### 파일 개수 감소

- 제거 전: 21개 컴포넌트 (예제 포함)
- 제거 후: 12개 컴포넌트 (핵심만)
- 감소율: 43% (9개 파일 삭제)

#### 의존성 최적화

- 제거: html2canvas, jspdf (23개 패키지)
- 추가: @react-pdf/renderer (52개 패키지)
- 순증가: +29 패키지 (기능 향상 대비 적절)

### Edge Cases 및 주의사항

#### package.json 수정 시

- npm install/uninstall 중 파일 변경 시 재읽기 필요
- 프로젝트명 변경 시 타이밍 고려

#### 예제 파일 제거 시

- 의존성 역순으로 제거 (예: smoke-test 컴포넌트 → 페이지)
- 불필요한 import 경로 확인 (남은 파일에서 참조 여부)

### 성공 패턴

#### 홈페이지 재작성

- 스타터 킷 마케팅 → 프로젝트 소개로 변경
- PRD 핵심 기능 중심으로 재구성
- 단계별 사용자 여정 강조 (1-2-3 단계)

#### README 구조

- 프로젝트 개요 → 빠른 시작 → 기술 스택 → 명령어 순서
- PRD와 일관성 유지
- MVP 성공 기준 체크리스트 포함

## 참고 링크

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com)
- [@react-pdf/renderer](https://react-pdf.org)
- [Notion API](https://developers.notion.com)
