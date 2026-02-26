# 노션 기반 견적서 관리 시스템 개발 로드맵

노션 데이터베이스를 활용한 견적서 관리 및 클라이언트 공유 시스템 MVP 개발

## 개요

노션 기반 견적서 관리 시스템은 프리랜서/소규모 기업을 위한 견적서 관리 도구로 다음 기능을 제공합니다:

- **노션 데이터베이스 연동 (F001)**: Notion API를 통해 견적서 데이터를 실시간으로 조회
- **견적서 웹 조회 (F002)**: 고유 URL을 통해 클라이언트가 견적서를 웹에서 확인
- **PDF 다운로드 (F003)**: 견적서를 PDF 파일로 변환하여 다운로드
- **견적서 URL 생성 (F010)**: 노션 페이지 ID 기반 고유 URL 자동 생성
- **유효성 검증 (F011)**: 존재하지 않는 견적서 접근 시 적절한 에러 처리
- **반응형 레이아웃 (F012)**: 모바일/태블릿/데스크톱 대응

### 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.1.6 (App Router) |
| 언어 | TypeScript 5, React 19 |
| 스타일링 | TailwindCSS v4, shadcn/ui |
| 외부 API | @notionhq/client (Notion API v1) |
| PDF 생성 | @react-pdf/renderer |
| 배포 | Vercel |

### 현재 프로젝트 상태

프로젝트는 초기 설정이 완료된 상태입니다:
- 루트 레이아웃 (Header, Footer, ThemeProvider) 구현 완료
- 홈 페이지 (Hero, 기능 소개, 기술 스택 섹션) 구현 완료
- shadcn/ui 기본 컴포넌트 설치 완료 (Button, Card, Badge, Dialog, DropdownMenu, Input)
- 다크/라이트 테마 전환 기능 구현 완료

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

> 전체 라우트 구조, 타입 정의, 빈 페이지 껍데기를 먼저 완성하여 개발 기반을 마련합니다.

- **Task 001: 프로젝트 라우트 구조 및 페이지 골격 생성** - 우선순위
  - `app/invoice/[id]/page.tsx` 견적서 조회 페이지 빈 골격 생성
  - `app/invoice/[id]/loading.tsx` 로딩 UI 골격 생성
  - `app/invoice/[id]/not-found.tsx` 404 에러 페이지 골격 생성
  - `app/api/generate-pdf/route.ts` PDF 생성 API 라우트 골격 생성
  - 환경 변수 설정 파일 (`.env.local.example`) 작성

- **Task 002: TypeScript 타입 정의 및 인터페이스 설계**
  - `lib/types/invoice.ts` 견적서 관련 타입 정의 (Invoice, InvoiceItem, InvoiceStatus)
  - `lib/types/notion.ts` Notion API 응답 매핑 타입 정의
  - `lib/types/pdf.ts` PDF 생성 관련 타입 정의
  - 더미 데이터 생성 유틸리티 `lib/mock/invoice-data.ts` 작성
  - Notion 데이터베이스 필드와 TypeScript 타입 간 매핑 문서화

### Phase 2: UI/UX 완성 (더미 데이터 활용)

> 실제 API 연동 없이 하드코딩된 더미 데이터로 모든 페이지 UI를 완성합니다.
> 이 단계에서 전체 사용자 플로우를 시각적으로 검증할 수 있습니다.

- **Task 003: 견적서 조회 페이지 UI 구현**
  - 견적서 헤더 영역 (견적서 번호, 발행일, 유효기간, 상태 뱃지)
  - 발행자/수신자 정보 카드 컴포넌트
  - 견적 항목 테이블 (항목명, 수량, 단가, 금액)
  - 합계 금액 표시 영역
  - PDF 다운로드 버튼 UI (기능 미연결)
  - 더미 데이터로 전체 레이아웃 완성

- **Task 004: 에러 페이지 및 로딩 UI 구현**
  - 견적서 not-found 페이지 UI (F011: 친절한 안내 메시지, 발행자 문의 가이드)
  - 견적서 조회 로딩 스켈레톤 UI
  - 전역 에러 바운더리 (`app/error.tsx`) 구현

- **Task 005: 반응형 디자인 및 모바일 최적화**
  - 견적서 조회 페이지 모바일/태블릿/데스크톱 반응형 적용 (F012)
  - 견적 항목 테이블의 모바일 대응 (가로 스크롤 또는 카드형 변환)
  - 인쇄용 스타일시트 (`@media print`) 적용
  - 다양한 뷰포트에서 레이아웃 검증

### Phase 3: 핵심 기능 구현

> 더미 데이터를 실제 Notion API 호출로 교체하고, PDF 생성 기능을 구현합니다.

- **Task 006: Notion API 연동 및 데이터 조회 구현** - 우선순위
  - `lib/notion/client.ts` Notion 클라이언트 초기화 및 설정 (F001)
  - `lib/notion/queries.ts` 견적서 페이지 조회 함수 구현 (F001, F010)
  - `lib/notion/queries.ts` 견적 항목 (Relation) 데이터 조회 함수 구현
  - `lib/notion/mapper.ts` Notion 응답 데이터를 TypeScript 타입으로 변환하는 매퍼
  - 존재하지 않는 페이지 ID 접근 시 에러 핸들링 (F011)
  - 견적서 조회 페이지에서 더미 데이터를 실제 API 호출로 교체 (F002)
  - Playwright MCP를 활용한 Notion API 연동 통합 테스트

- **Task 007: PDF 생성 및 다운로드 기능 구현**
  - `components/pdf/invoice-template.tsx` React PDF 템플릿 컴포넌트 작성 (F003)
  - `app/api/generate-pdf/route.ts` PDF 생성 API 엔드포인트 구현 (F003)
  - 견적서 조회 페이지의 PDF 다운로드 버튼에 실제 기능 연결
  - PDF 파일명 규칙 적용 (예: `견적서_INV-2026-001.pdf`)
  - PDF 생성 실패 시 에러 핸들링 및 사용자 피드백
  - Playwright MCP를 활용한 PDF 다운로드 E2E 테스트

- **Task 008: 핵심 기능 통합 테스트 및 검증**
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트 (URL 접속 -> 견적서 조회 -> PDF 다운로드)
  - 존재하지 않는 견적서 ID 접근 시 404 페이지 표시 검증
  - 모바일/태블릿/데스크톱 반응형 레이아웃 E2E 테스트
  - Notion API 에러 상황 (네트워크 오류, 권한 오류 등) 대응 검증
  - PDF 생성 및 다운로드 정상 동작 검증

### Phase 4: 최적화 및 배포

> 성능 최적화, 메타데이터 설정, 배포 파이프라인을 구축합니다.

- **Task 009: SEO 및 메타데이터 최적화**
  - 견적서 페이지별 동적 메타데이터 생성 (`generateMetadata`)
  - Open Graph 태그 설정 (공유 시 미리보기)
  - `robots.txt` 및 `sitemap.xml` 설정 (견적서 페이지는 인덱싱 제외)
  - 파비콘 및 웹 매니페스트 설정

- **Task 010: 성능 최적화 및 캐싱 전략**
  - Notion API 응답 캐싱 전략 구현 (ISR 또는 revalidate 설정)
  - Next.js Image 컴포넌트 최적화 (필요 시)
  - 번들 사이즈 분석 및 최적화
  - 로딩 성능 측정 및 개선

- **Task 011: Vercel 배포 및 환경 설정**
  - Vercel 프로젝트 설정 및 환경 변수 등록 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
  - 프로덕션 빌드 검증 (`npm run build`)
  - 커스텀 도메인 설정 (선택)
  - 배포 후 전체 기능 검증 테스트

---

## MVP 완료 기준

PRD에 명시된 MVP 성공 기준과 매핑:

| 번호 | 성공 기준 | 관련 Task | 관련 기능 |
|------|-----------|-----------|-----------|
| 1 | 노션 데이터베이스에서 견적서 정보를 정상적으로 가져옴 | Task 006 | F001 |
| 2 | 고유 URL로 접근 시 견적서가 웹에서 정확하게 표시됨 | Task 003, 006 | F002, F010 |
| 3 | PDF 다운로드 버튼 클릭 시 견적서가 PDF로 다운로드됨 | Task 007 | F003 |
| 4 | 모바일/태블릿/데스크톱에서 정상 작동 | Task 005 | F012 |
| 5 | 잘못된 URL 접근 시 적절한 에러 메시지 표시 | Task 004, 006 | F011 |

---

## 의존성 관계

```
Task 001 (라우트 골격)
  └── Task 002 (타입 정의)
        ├── Task 003 (견적서 UI) ──────── Task 006 (Notion API 연동)
        ├── Task 004 (에러/로딩 UI) ────── Task 006 (Notion API 연동)
        └── Task 005 (반응형 디자인)       Task 007 (PDF 생성)
                                              └── Task 008 (통합 테스트)
                                                    ├── Task 009 (SEO 최적화)
                                                    ├── Task 010 (성능 최적화)
                                                    └── Task 011 (Vercel 배포)
```

- Phase 1 (Task 001-002): 모든 후속 작업의 기반. 반드시 먼저 완료
- Phase 2 (Task 003-005): UI 작업은 서로 독립적이며 병렬 개발 가능
- Phase 3 (Task 006-008): Task 006은 Phase 2 완료 후 시작. Task 007은 Task 006과 병렬 가능. Task 008은 006, 007 완료 후 시작
- Phase 4 (Task 009-011): Task 008 완료 후 시작. 서로 독립적이며 병렬 가능

---

## 예상 일정

| Phase | 예상 기간 | 비고 |
|-------|-----------|------|
| Phase 1: 애플리케이션 골격 구축 | 2-3일 | 구조 설계 및 타입 정의 |
| Phase 2: UI/UX 완성 | 3-5일 | 더미 데이터 기반 전체 UI |
| Phase 3: 핵심 기능 구현 | 5-7일 | Notion API + PDF 생성 + 통합 테스트 |
| Phase 4: 최적화 및 배포 | 2-3일 | 성능/SEO 최적화, Vercel 배포 |
| **합계** | **약 2-3주** | MVP 완성 기준 |

---

**문서 버전**: v1.0
**작성일**: 2026-02-26
**기반 문서**: docs/PRD.md v1.0 (MVP)
