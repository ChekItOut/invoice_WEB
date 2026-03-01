# 노션 기반 견적서 관리 시스템 PRD v2.0

## 🎯 핵심 정보

**목적**: 노션을 데이터베이스로 활용하여 견적서를 관리하고, 관리자 대시보드를 통해 견적서 링크를 쉽게 공유하며, 클라이언트가 웹에서 조회 및 PDF 다운로드할 수 있는 통합 시스템
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업(관리자)과 견적서를 받는 클라이언트

## 🚶 사용자 여정

### 견적서 작성자 (관리자)

```
1. 노션 데이터베이스
   ↓ 견적서 정보 입력 및 작성 완료

2. 관리자 페이지 로그인
   ↓ 환경변수 기반 패스워드 인증

3. 견적서 목록 조회
   ↓ 발행한 모든 견적서 확인
   ↓ 검색/필터링으로 특정 견적서 찾기

4. 링크 복사 버튼 클릭
   ↓ 원클릭으로 견적서 고유 URL 복사
   ↓ 클립보드에 저장 완료 (토스트 알림)

5. 클라이언트에게 링크 전달
   ↓ 이메일/메신저로 붙여넣기

6. 완료
```

### 클라이언트 (견적서 수신자)

```
1. 이메일/메신저에서 링크 클릭
   ↓ 고유 견적서 URL 접속

2. 견적서 조회 페이지
   ↓ 견적서 내용 확인

3. PDF 다운로드 버튼 클릭
   ↓ PDF 생성 및 다운로드

4. 완료 → 견적서 파일 저장/인쇄 가능
```

## ⚡ 기능 명세

### Phase 1: 클라이언트 조회 기능 (MVP 완료 ✅)

| ID       | 기능명                 | 설명                                 | 필수 이유                                          | 관련 페이지        | 상태 |
| -------- | ---------------------- | ------------------------------------ | -------------------------------------------------- | ------------------ | ---- |
| **F001** | 노션 데이터베이스 연동 | Notion API를 통해 견적서 데이터 조회 | 시스템의 핵심 데이터 소스                          | 견적서 조회 페이지 | ✅   |
| **F002** | 견적서 조회            | 고유 URL로 특정 견적서 내용 표시     | 클라이언트가 견적서를 확인하는 핵심 기능           | 견적서 조회 페이지 | ✅   |
| **F003** | PDF 다운로드           | 견적서를 PDF 파일로 변환 및 다운로드 | 클라이언트가 견적서를 저장/인쇄하기 위한 필수 기능 | 견적서 조회 페이지 | ✅   |
| **F010** | 견적서 URL 생성        | 노션 페이지 ID 기반 고유 URL 생성    | 견적서 접근을 위한 필수 기능                       | 시스템 자동 생성   | ✅   |
| **F011** | 견적서 유효성 검증     | 존재하지 않는 견적서 접근 시 에러    | 잘못된 URL 접근 방지                               | 견적서 조회 페이지 | ✅   |
| **F012** | 반응형 레이아웃        | 모바일/태블릿/데스크톱 대응          | 다양한 기기에서 견적서 확인                        | 견적서 조회 페이지 | ✅   |

### Phase 2: 관리자 기능 (현재 개발 중)

| ID       | 기능명                 | 설명                                           | 필수 이유                              | 관련 페이지         | 상태 |
| -------- | ---------------------- | ---------------------------------------------- | -------------------------------------- | ------------------- | ---- |
| **F020** | 관리자 인증 시스템     | 환경변수 기반 패스워드 인증 및 세션 관리       | 관리자 페이지 접근 제어                | 관리자 로그인       | 🔄   |
| **F021** | 견적서 목록 관리       | Notion DB의 모든 견적서 조회 및 관리           | 발행한 견적서를 한눈에 관리            | 관리자 대시보드     | ✅   |
| **F022** | 검색 및 필터링         | 클라이언트명, 견적서 번호, 상태, 날짜로 검색   | 특정 견적서를 빠르게 찾기              | 관리자 대시보드     | 🔄   |
| **F023** | 고유 링크 표시         | 각 견적서의 고유 URL을 목록에 표시             | 클라이언트에게 전달할 링크 확인        | 관리자 대시보드     | 🔄   |
| **F024** | 원클릭 링크 복사       | 클립보드 API를 활용한 링크 복사 버튼           | 링크 공유 시간 단축 (80% 절감)         | 관리자 대시보드     | 🔄   |
| **F025** | 링크 공유 통합         | 이메일, 카카오톡 등 다양한 공유 방법 제공      | 다양한 채널로 견적서 전달              | 관리자 대시보드     | 🔄   |
| **F026** | 페이지네이션 및 정렬   | 견적서 목록을 페이지별로 나누고 정렬           | 대량 데이터 효율적 관리                | 관리자 대시보드     | 🔄   |

**상태 범례**: ✅ 완료 | 🔄 개발 중 | ⏸️ 보류

### Phase 3: 향후 개선 기능 (v3.0 이후)

- 견적서 상태 관리 (승인/거절/대기 수동 업데이트)
- 이메일 자동 발송 기능 (SendGrid/Resend 연동)
- 견적서 템플릿 커스터마이징
- 견적서 버전 관리 및 히스토리
- 다국어 지원
- 견적서 통계 및 대시보드 차트
- QR 코드 생성 기능

## 📱 메뉴 구조

```
📱 견적서 시스템
│
├── 🌐 공개 영역 (인증 불필요)
│   └── 📄 견적서 조회 (/invoice/[id])
│       └── 기능: F001, F002, F003, F011, F012
│           (노션 데이터 조회, 웹 뷰어, PDF 다운로드)
│
└── 🔒 관리자 영역 (인증 필요)
    ├── 🔑 로그인 (/admin/login)
    │   └── 기능: F020 (환경변수 기반 패스워드 인증)
    │
    └── 📊 견적서 목록 (/admin/invoices)
        └── 기능: F021, F022, F023, F024, F025, F026
            (목록 조회, 검색/필터링, 링크 복사/공유, 페이지네이션)
```

---

## 📄 페이지별 상세 기능

### 1. 견적서 조회 페이지 (클라이언트용)

> **구현 기능:** `F001`, `F002`, `F003`, `F011`, `F012` | **접근 방식:** 공개 URL (인증 불필요)

| 항목            | 내용                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **역할**        | 클라이언트가 고유 링크를 통해 견적서를 조회하고 PDF로 다운로드하는 전용 페이지                                                                                                                                                                                           |
| **진입 경로**   | 이메일/메신저에서 받은 고유 URL 클릭 (예: `/invoice/[notionPageId]`)                                                                                                                                                                                                     |
| **사용자 행동** | • 견적서 내용 확인 (회사정보, 항목, 금액 등)<br>• PDF 다운로드 버튼 클릭<br>• 견적서 파일 저장/인쇄                                                                                                                                                                      |
| **주요 기능**   | • 노션 API를 통한 견적서 데이터 실시간 조회<br>• 견적서 정보 렌더링 (발행일, 유효기간, 항목별 금액, 총액 등)<br>• 존재하지 않는 견적서 ID 접근 시 404 에러 표시<br>• 반응형 디자인으로 모든 디바이스 지원<br>• **PDF 다운로드** 버튼 (클릭 시 즉시 PDF 생성 및 다운로드) |
| **다음 이동**   | PDF 다운로드 완료 → 같은 페이지 유지 (재다운로드 가능), 잘못된 URL → 404 에러 페이지                                                                                                                                                                                     |

---

### 2. 404 에러 페이지

> **구현 기능:** `F011` | **접근 방식:** 자동 리디렉션

| 항목            | 내용                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **역할**        | 존재하지 않는 견적서 ID 접근 시 안내 메시지 표시                                                  |
| **진입 경로**   | 잘못된 견적서 URL 접근 시 자동 표시                                                               |
| **사용자 행동** | • 에러 메시지 확인<br>• 발행자에게 올바른 링크 요청 안내                                          |
| **주요 기능**   | • 친절한 에러 메시지 표시<br>• "견적서를 찾을 수 없습니다" 안내<br>• 발행자에게 문의하도록 가이드 |
| **다음 이동**   | 페이지 종료 (사용자가 올바른 링크를 다시 받아야 함)                                               |

---

### 3. 관리자 로그인 페이지

> **구현 기능:** `F020` | **접근 방식:** 공개 URL (인증 전)

| 항목            | 내용                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **역할**        | 관리자 인증을 통해 대시보드 접근 권한 부여                                                                                                              |
| **진입 경로**   | `/admin/login` 직접 접속 또는 보호된 관리자 페이지 접근 시 자동 리디렉션                                                                               |
| **사용자 행동** | • 패스워드 입력 (환경변수 `ADMIN_PASSWORD`와 비교)<br>• 로그인 버튼 클릭<br>• 인증 성공 시 세션 생성                                                  |
| **주요 기능**   | • 환경변수 기반 패스워드 검증<br>• Next.js 세션 쿠키 생성 (httpOnly, secure)<br>• 로그인 실패 시 에러 메시지 표시<br>• "비밀번호를 잊으셨나요?" 안내 |
| **다음 이동**   | 로그인 성공 → `/admin/invoices` (견적서 목록), 실패 → 같은 페이지 유지 (에러 표시)                                                                    |

---

### 4. 관리자 견적서 목록 페이지

> **구현 기능:** `F021`, `F022`, `F023`, `F024`, `F025`, `F026` | **접근 방식:** 인증 필요 (미들웨어 보호)

| 항목            | 내용                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **역할**        | 발행한 모든 견적서를 한눈에 관리하고, 클라이언트에게 전달할 링크를 쉽게 복사/공유하는 통합 대시보드                                                                                                                                                                                                                                                                |
| **진입 경로**   | 로그인 성공 후 `/admin/invoices` 자동 이동 또는 헤더 메뉴에서 직접 접근                                                                                                                                                                                                                                                                                            |
| **사용자 행동** | • 견적서 목록 조회 (발행일, 클라이언트명, 상태, 총액 확인)<br>• 검색창에 클라이언트명 또는 견적서 번호 입력<br>• 상태별 필터 선택 (대기/승인/거절)<br>• 날짜 범위 필터 선택<br>• "링크 복사" 버튼 클릭 → 클립보드에 복사<br>• "공유" 버튼 클릭 → 이메일/메신저 공유 옵션 선택<br>• 견적서 행 클릭 → 상세 조회 페이지로 이동<br>• 페이지네이션으로 다음 페이지 이동 |
| **주요 기능**   | • Notion Database Query API로 전체 견적서 조회 (F021)<br>• 실시간 검색 (디바운싱 300ms) 및 다중 필터 적용 (F022)<br>• 각 행에 고유 링크 표시 (축약 형태) (F023)<br>• 클립보드 API로 원클릭 복사 + 토스트 알림 (F024)<br>• mailto, 카카오톡 공유 링크 생성 (F025)<br>• 10개씩 페이지네이션 + 정렬 (발행일, 총액, 상태) (F026)<br>• 반응형 테이블 (모바일: 카드형) |
| **다음 이동**   | 견적서 클릭 → `/invoice/[id]` (상세 조회), 로그아웃 → `/admin/login`, 새로고침 → 같은 페이지 유지                                                                                                                                                                                                                                                                  |

---

## 🗄️ 데이터 모델

### Notion Database (견적서 정보)

| 필드           | 설명                | 타입/관계        |
| -------------- | ------------------- | ---------------- |
| id             | 노션 페이지 고유 ID | String (Notion)  |
| invoice_number | 견적서 번호         | String           |
| client_name    | 클라이언트명        | String           |
| issue_date     | 발행일              | Date             |
| valid_until    | 유효기간            | Date             |
| items          | 견적 항목 리스트    | Array (Relation) |
| total_amount   | 총 금액             | Number           |
| status         | 견적서 상태         | Select           |

### Notion Database Items (견적 항목)

| 필드        | 설명               | 타입/관계       |
| ----------- | ------------------ | --------------- |
| id          | 항목 고유 ID       | String (Notion) |
| description | 항목 설명          | String          |
| quantity    | 수량               | Number          |
| unit_price  | 단가               | Number          |
| amount      | 금액 (수량 × 단가) | Formula         |
| invoice_id  | 연결된 견적서      | → Invoice.id    |

### 세션 관리 (관리자 인증)

| 필드          | 설명                | 타입/저장소    |
| ------------- | ------------------- | -------------- |
| session_token | 세션 토큰           | Cookie (httpOnly, secure) |
| user_id       | 관리자 식별자       | String (고정값: "admin") |
| expires_at    | 세션 만료 시간      | Timestamp |
| created_at    | 세션 생성 시간      | Timestamp |

**참고**: MVP에서는 단일 관리자만 지원하며, 환경변수 `ADMIN_PASSWORD`로 인증합니다.

### 노션 데이터베이스 구조 예시

```
📁 견적서 데이터베이스 (Invoices)
├── 견적서 번호 (Title)
├── 클라이언트명 (Text)
├── 발행일 (Date)
├── 유효기간 (Date)
├── 상태 (Select: 대기/승인/거절)
├── 총 금액 (Number)
└── 항목 (Relation → Items)

📁 항목 데이터베이스 (Items)
├── 항목명 (Title)
├── 수량 (Number)
├── 단가 (Number)
├── 금액 (Formula: 수량 × 단가)
└── 견적서 (Relation → Invoices)
```

## 🛠️ 기술 스택 (최신 버전)

### 🎨 프론트엔드 프레임워크

- **Next.js 16.1.6** (App Router) - React 풀스택 프레임워크
- **TypeScript 5.x** - 타입 안전성 보장
- **React 19** - UI 라이브러리

### 🎨 스타일링 & UI

- **TailwindCSS v4** - 유틸리티 CSS 프레임워크
- **shadcn/ui** - 고품질 React 컴포넌트 라이브러리 (Button, Card, Input, Toast, Dialog 등)
- **Lucide React** - 아이콘 라이브러리

### 📝 외부 API & 통합

- **@notionhq/client** - Notion API 공식 SDK
- **Notion API v1** - 데이터베이스 조회 (Database Query) 및 페이지 정보 가져오기

### 📄 PDF 생성

- **@react-pdf/renderer** - React 컴포넌트로 PDF 생성

### 🔒 인증 & 세션 관리

- **Next.js Middleware** - 보호된 라우트 접근 제어
- **Cookie (httpOnly, secure)** - 세션 토큰 저장
- **bcrypt** (선택사항) - 패스워드 해싱 (환경변수로 평문 저장 시 불필요)

### 🎨 관리자 UI 라이브러리

- **Clipboard API** - 브라우저 네이티브 클립보드 기능
- **React Hook Form** (선택사항) - 폼 상태 관리
- **Date-fns** 또는 **Day.js** - 날짜 포맷팅 및 필터링

### 🚀 배포 & 호스팅

- **Vercel** - Next.js 16 최적화 배포 플랫폼
- **환경 변수**:
  - `NOTION_API_KEY` - Notion API 인증 키
  - `NOTION_DATABASE_ID` - 견적서 데이터베이스 ID
  - `ADMIN_PASSWORD` - 관리자 로그인 패스워드
  - `SESSION_SECRET` - 세션 토큰 암호화 키

### 📦 패키지 관리

- **npm** - 의존성 관리

---

## 🔑 Notion API 설정 가이드

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "견적서 시스템")
4. "Internal Integration Token" 복사 → `.env.local`에 저장

### 2. 데이터베이스 연결

1. Notion에서 견적서 데이터베이스 생성
2. 데이터베이스 우측 상단 "..." → "Add connections" → 생성한 Integration 선택
3. 데이터베이스 ID 복사 (URL에서 확인 가능)

### 3. 환경 변수 설정

```env
# Notion API 설정
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx

# 관리자 인증 설정 (v2.0 추가)
ADMIN_PASSWORD=your-secure-password-here
SESSION_SECRET=random-32-char-string-for-encryption
```

---

## 📦 핵심 구현 로직

### 1. Notion 데이터 조회 (Server Component)

```typescript
// app/invoice/[id]/page.tsx
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getInvoice(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  return { page, blocks };
}
```

### 2. Notion Database 전체 조회 (관리자 목록)

```typescript
// lib/notion/queries.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getAllInvoices() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    sorts: [{ property: "발행일", direction: "descending" }],
  });
  return response.results;
}
```

### 3. PDF 생성 (API Route)

```typescript
// app/api/generate-pdf/route.ts
import { PDFDocument } from '@react-pdf/renderer';

export async function POST(req: Request) {
  const { invoiceData } = await req.json();
  const pdfDoc = <InvoicePDF data={invoiceData} />;
  const blob = await pdf(pdfDoc).toBlob();
  return new Response(blob, {
    headers: { 'Content-Type': 'application/pdf' }
  });
}
```

### 4. 관리자 인증 (Middleware)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;

  // 관리자 페이지 접근 시 세션 검증
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!sessionToken || !isValidSession(sessionToken)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
```

### 5. 링크 복사 (Client Component)

```typescript
// components/admin/CopyButton.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CopyButton({ link }: { link: string }) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "링크 복사 완료",
        description: "견적서 링크가 클립보드에 복사되었습니다.",
      });
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "링크 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return <button onClick={handleCopy}>링크 복사</button>;
}
```

### 6. 고유 URL 구조

```
클라이언트 조회 페이지:
https://yourdomain.com/invoice/[notionPageId]
예: https://invoice.example.com/invoice/abc123def456

관리자 페이지:
https://yourdomain.com/admin/login
https://yourdomain.com/admin/invoices
```

---

## ✅ 성공 기준

### Phase 1: MVP 핵심 기능 (완료 ✅)

1. ✅ 노션 데이터베이스에서 견적서 정보를 정상적으로 가져옴 (F001)
2. ✅ 고유 URL로 접근 시 견적서가 웹에서 정확하게 표시됨 (F002, F010)
3. ✅ PDF 다운로드 버튼 클릭 시 견적서가 PDF로 다운로드됨 (F003)
4. ✅ 모바일/태블릿/데스크톱에서 정상 작동 (F012)
5. ✅ 잘못된 URL 접근 시 적절한 에러 메시지 표시 (F011)

### Phase 2: 관리자 기능 (개발 중 🔄)

1. 🔄 환경변수 패스워드로 관리자 로그인이 가능함 (F020)
2. ✅ 관리자 페이지에서 모든 견적서 목록이 표시됨 (F021)
3. 🔄 클라이언트명, 견적서 번호로 검색이 가능함 (F022)
4. 🔄 상태별, 날짜별 필터링이 작동함 (F022)
5. 🔄 각 견적서의 고유 링크가 목록에 표시됨 (F023)
6. 🔄 "링크 복사" 버튼 클릭 시 클립보드에 복사되고 토스트 알림이 표시됨 (F024)
7. 🔄 이메일, 카카오톡 등으로 링크를 쉽게 공유할 수 있음 (F025)
8. 🔄 페이지네이션 및 정렬 기능이 정상 작동함 (F026)
9. 🔄 미인증 상태에서 관리자 페이지 접근 시 로그인 페이지로 리디렉션됨 (F020)
10. 🔄 모든 관리자 기능이 기존 클라이언트 조회 기능과 충돌 없이 작동함

**상태 범례**: ✅ 완료 | 🔄 개발 중

---

## 🚀 향후 개선 방향 (v3.0 이후)

### Phase 3: 견적서 상태 관리 및 자동화

- **견적서 상태 업데이트**: 관리자 대시보드에서 상태 변경 (대기/승인/거절)
- **이메일 자동 발송**: SendGrid/Resend 연동으로 견적서 링크 자동 전송
- **견적서 만료 알림**: 유효기간 임박 시 자동 알림
- **클라이언트 응답 추적**: 조회 여부, PDF 다운로드 여부 트래킹
- **견적서 통계 대시보드**: 총 견적서 수, 승인율, 월별 통계 차트

### Phase 4: 고급 기능 및 확장

- **다중 관리자 지원**: OAuth 2.0 기반 인증 (Google, GitHub)
- **견적서 템플릿 커스터마이징**: 로고, 색상, 레이아웃 변경 가능
- **다국어 견적서**: 영어, 일본어 등 다국어 지원
- **전자 서명 기능**: 클라이언트가 웹에서 견적서에 서명
- **견적서 버전 관리**: 수정 내역 추적 및 이전 버전 복원
- **QR 코드 생성**: 견적서 링크를 QR 코드로 변환
- **API 엔드포인트 제공**: 외부 시스템 연동을 위한 REST API

### Phase 5: 비즈니스 확장

- **결제 시스템 연동**: Stripe, Toss Payments로 견적서에서 바로 결제
- **계약서 자동 생성**: 승인된 견적서를 계약서로 변환
- **클라이언트 포털**: 클라이언트가 자신의 모든 견적서를 확인하는 별도 페이지
- **SaaS 멀티 테넌시**: 여러 회사가 독립적으로 사용하는 서비스로 확장

---

**📝 문서 버전**: v2.0 (관리자 기능 포함)
**📅 작성일**: 2026-03-01
**📅 최종 수정일**: 2026-03-01
**🎯 목표**: MVP 기반 위에 관리자 경험 향상 및 링크 공유 효율성 극대화
**📊 진행 상황**: Phase 1 완료 ✅ | Phase 2 개발 중 (3/7 Tasks 완료 - 43%)
