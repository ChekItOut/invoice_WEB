# 견적서 관리 시스템 (Invoice Web)

노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF로 다운로드할 수 있는 시스템입니다.

## 🎯 프로젝트 개요

**목적**: 노션 기반 견적서 관리 및 공유 시스템
**버전**: 0.1.0 (MVP)
**기술 스택**: Next.js 16, TypeScript, React 19, Notion API, TailwindCSS v4

## ✨ 핵심 기능

### MVP 구현 기능

- **노션 데이터베이스 연동**: Notion API를 통한 견적서 데이터 실시간 조회
- **견적서 웹 조회**: 고유 URL로 견적서 내용 확인 (`/invoice/[notionPageId]`)
- **PDF 다운로드**: 원클릭으로 견적서를 PDF 파일로 변환 및 다운로드
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- **에러 처리**: 잘못된 URL 접근 시 친절한 404 페이지

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 프로젝트 클론 및 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
```

### 2. Notion API 설정

1. [Notion Developers](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. "Internal Integration Token" 복사하여 `.env.local`에 추가
3. 노션 데이터베이스 생성 후 Integration 연결
4. 데이터베이스 ID를 `.env.local`에 추가

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📦 기술 스택

### 프론트엔드

- **Next.js 16.1.6** - App Router 기반 React 프레임워크
- **TypeScript 5.x** - 타입 안전성 보장
- **React 19.2.3** - 최신 UI 라이브러리
- **TailwindCSS v4** - 유틸리티 CSS 프레임워크
- **shadcn/ui** - 고품질 UI 컴포넌트

### 백엔드 & API

- **@notionhq/client 5.9.0** - Notion API 공식 SDK
- **@react-pdf/renderer 4.3.2** - React 기반 PDF 생성

### 개발 도구

- **ESLint 9** - 코드 품질 검사
- **Prettier 3.8.1** - 코드 포맷팅
- **TypeScript Compiler** - 타입 검사

## 📁 프로젝트 구조

```
invoice-web/
├── app/                        # Next.js App Router
│   ├── invoice/
│   │   └── [id]/
│   │       └── page.tsx       # 견적서 조회 페이지
│   ├── api/
│   │   └── generate-pdf/
│   │       └── route.ts       # PDF 생성 API
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 홈페이지
│   └── globals.css            # 전역 스타일
│
├── components/                 # React 컴포넌트
│   ├── layout/                # Header, Footer
│   ├── ui/                    # shadcn/ui 컴포넌트
│   ├── theme-provider.tsx     # 테마 관리
│   └── theme-toggle.tsx       # 다크모드 토글
│
├── lib/
│   └── utils.ts               # 유틸리티 함수
│
├── docs/
│   └── PRD.md                 # 제품 요구사항 문서
│
├── .env.example               # 환경 변수 템플릿
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
└── CLAUDE.md                  # 개발 가이드
```

## 🛠️ 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린팅
npm run lint

# 코드 포맷팅
npm run format

# TypeScript 타입 검사
npm run type-check
```

## 🗄️ 노션 데이터베이스 구조

### Invoices (견적서 데이터베이스)

| 필드           | 타입     | 설명             |
| -------------- | -------- | ---------------- |
| invoice_number | Title    | 견적서 번호      |
| client_name    | Text     | 클라이언트명     |
| issue_date     | Date     | 발행일           |
| valid_until    | Date     | 유효기간         |
| items          | Relation | 견적 항목 리스트 |
| total_amount   | Number   | 총 금액          |
| status         | Select   | 견적서 상태      |

### Items (견적 항목 데이터베이스)

| 필드        | 타입    | 설명               |
| ----------- | ------- | ------------------ |
| description | Title   | 항목 설명          |
| quantity    | Number  | 수량               |
| unit_price  | Number  | 단가               |
| amount      | Formula | 금액 (수량 × 단가) |
| invoice_id  | Relation | 연결된 견적서      |

## 📄 사용자 여정

### 견적서 작성자 (관리자)

1. 노션 데이터베이스에 견적서 정보 입력
2. 자동으로 생성된 고유 URL 확인
3. 클라이언트에게 링크 전달 (이메일/메신저)

### 클라이언트 (견적서 수신자)

1. 이메일/메신저에서 고유 링크 클릭
2. 웹 브라우저에서 견적서 내용 확인
3. PDF 다운로드 버튼 클릭
4. 견적서 파일 저장/인쇄

## 🔒 보안 고려사항

- Notion API 키는 서버 사이드에서만 사용 (환경 변수)
- 견적서 ID는 Notion 페이지 ID로 관리 (추측 불가능)
- HTTPS 배포 필수 (Vercel 기본 제공)

## 🚀 배포

### Vercel (권장)

1. Vercel 계정에 프로젝트 연결
2. 환경 변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
3. 자동 배포 완료

```bash
# Vercel CLI 사용
npm install -g vercel
vercel
```

## 📚 문서

- [제품 요구사항 문서 (PRD)](./docs/PRD.md)
- [개발 가이드 (CLAUDE.md)](./CLAUDE.md)
- [Notion API 문서](https://developers.notion.com/)
- [Next.js 공식 문서](https://nextjs.org/docs)

## 🔄 향후 개선 계획 (MVP 이후)

### Phase 2: 관리 기능

- 관리자 대시보드 (발행한 견적서 목록)
- 견적서 상태 관리 (승인/거절 추적)
- 견적서 검색 및 필터링

### Phase 3: 자동화

- 이메일 자동 발송 (SendGrid/Resend 연동)
- 견적서 만료 알림
- 클라이언트 응답 트래킹

### Phase 4: 고급 기능

- 다중 템플릿 지원
- 다국어 견적서
- 전자 서명 기능
- 견적서 버전 관리

## ✅ MVP 성공 기준

- [x] 노션 데이터베이스에서 견적서 정보 조회
- [ ] 고유 URL로 견적서 웹 페이지 표시
- [ ] PDF 다운로드 기능 구현
- [ ] 모바일/태블릿/데스크톱 반응형 지원
- [ ] 잘못된 URL 접근 시 404 에러 처리

## 📝 라이센스

MIT License

## 👥 기여

버그 리포트, 기능 제안, Pull Request 환영합니다!

---

**📅 최종 업데이트**: 2026-02-26
**📧 문의**: 프로젝트 관리자에게 연락하세요
