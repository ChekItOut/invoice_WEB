# Task 001: 프로젝트 라우트 구조 및 페이지 골격 생성

## 개요

노션 기반 견적서 관리 시스템의 핵심 라우트 구조와 페이지 골격을 생성합니다. 실제 기능 구현 없이 파일 구조와 기본 컴포넌트 껍데기만 먼저 완성하여 후속 작업의 기반을 마련합니다.

이 작업은 Phase 1의 첫 단계로, 전체 애플리케이션의 뼈대를 구성하는 중요한 작업입니다.

## 관련 파일

- `app/invoice/[id]/page.tsx` (신규 생성)
- `app/invoice/[id]/loading.tsx` (신규 생성)
- `app/invoice/[id]/not-found.tsx` (신규 생성)
- `app/api/generate-pdf/route.ts` (신규 생성)
- `.env.local.example` (신규 생성)

## 수락 기준

- [ ] `app/invoice/[id]/page.tsx` 견적서 조회 페이지가 기본 레이아웃과 함께 생성됨
- [ ] `app/invoice/[id]/loading.tsx` 로딩 스켈레톤 UI가 구현됨
- [ ] `app/invoice/[id]/not-found.tsx` 404 에러 페이지가 사용자 친화적인 메시지와 함께 생성됨
- [ ] `app/api/generate-pdf/route.ts` PDF 생성 API 라우트의 기본 구조가 생성됨
- [ ] `.env.local.example` 환경 변수 예시 파일이 필요한 변수들과 함께 작성됨
- [ ] 모든 페이지가 Next.js App Router 규칙을 준수함
- [ ] 개발 서버 실행 시 `/invoice/test-id` 경로로 접근 가능함
- [ ] TypeScript 타입 에러 없이 빌드됨

## 구현 단계

### 1단계: 견적서 조회 페이지 골격 생성

- [ ] `app/invoice/[id]` 디렉토리 생성
- [ ] `app/invoice/[id]/page.tsx` 파일 생성
  - 동적 라우트 파라미터 `params.id` 수신
  - 기본 Server Component 구조
  - 임시 헤더 텍스트 "견적서 조회" 표시
  - TypeScript 타입 정의 (`PageProps` 인터페이스)
- [ ] 개발 서버에서 `/invoice/test-123` 접근하여 페이지 렌더링 확인

### 2단계: 로딩 및 에러 페이지 생성

- [ ] `app/invoice/[id]/loading.tsx` 파일 생성
  - 스켈레톤 UI 컴포넌트 구현 (Card 기반)
  - 견적서 헤더, 항목 테이블 영역 스켈레톤 표시
  - shadcn/ui의 Skeleton 컴포넌트 활용 (필요 시 설치)
- [ ] `app/invoice/[id]/not-found.tsx` 파일 생성
  - 404 에러 메시지 ("요청하신 견적서를 찾을 수 없습니다")
  - 홈으로 돌아가기 버튼 (Link 컴포넌트 사용)
  - 발행자 문의 안내 텍스트
- [ ] 존재하지 않는 경로(`/invoice/invalid-id`)로 접근하여 에러 페이지 확인

### 3단계: PDF 생성 API 라우트 골격 생성

- [ ] `app/api/generate-pdf` 디렉토리 생성
- [ ] `app/api/generate-pdf/route.ts` 파일 생성
  - POST 메서드 핸들러 구현
  - 요청 body에서 `invoiceId` 파라미터 수신
  - 임시 응답 반환 (JSON: `{ success: true, message: "PDF generation placeholder" }`)
  - TypeScript 타입 정의 (`NextRequest`, `NextResponse` 활용)
- [ ] Postman 또는 curl로 API 엔드포인트 테스트

### 4단계: 환경 변수 예시 파일 작성

- [ ] `.env.local.example` 파일 루트에 생성
- [ ] 다음 환경 변수 포함:
  - `NOTION_API_KEY=` (Notion Integration Token)
  - `NOTION_DATABASE_ID=` (견적서 데이터베이스 ID)
  - `NEXT_PUBLIC_BASE_URL=` (공유 URL 생성용, 예: http://localhost:3000)
- [ ] 각 변수에 주석으로 설명 추가

### 5단계: 전체 구조 검증 및 빌드 테스트

- [ ] `npm run dev`로 개발 서버 실행 확인
- [ ] `/invoice/test-123` 페이지 접근 확인
- [ ] 로딩 상태 시뮬레이션 (Slow 3G 네트워크로 테스트)
- [ ] `npm run build`로 프로덕션 빌드 성공 확인
- [ ] `npm run type-check`로 TypeScript 에러 없음 확인
- [ ] `npm run lint`로 코드 품질 검사 통과 확인

## 테스트 체크리스트

이 작업은 골격 생성이므로 Playwright MCP 테스트는 필요하지 않습니다. 대신 수동 검증을 수행합니다:

- [ ] 개발 서버에서 `/invoice/test-id` 접근 시 페이지가 정상 렌더링됨
- [ ] 브라우저 개발자 도구에서 콘솔 에러가 없음
- [ ] 네트워크 탭에서 불필요한 요청이 없음
- [ ] 로딩 상태가 올바르게 표시됨
- [ ] 404 페이지가 적절한 메시지와 함께 표시됨

## 변경 사항 요약

(작업 완료 후 기록)
