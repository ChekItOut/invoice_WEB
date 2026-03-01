# 인보이스 PDF 템플릿 컴포넌트 가이드

## 개요

인보이스/견적서를 PDF로 출력할 수 있는 템플릿 컴포넌트입니다. A4 사이즈에 최적화되어 있으며, 화면 프리뷰와 인쇄 모두를 지원합니다.

## 컴포넌트 구조

### 1. `InvoicePdfTemplate`

순수한 PDF 템플릿 마크업 컴포넌트입니다. Server Component로 사용 가능합니다.

**Props:**

- `invoice` (Invoice): 견적서 데이터 객체
- `companyLogo?` (string): 회사 로고 URL (선택사항)

**사용 예시:**

```tsx
import { InvoicePdfTemplate } from "@/components/invoice/invoice-pdf-template";

export default function InvoicePage() {
  const invoice = {
    // Invoice 타입 데이터
  };

  return <InvoicePdfTemplate invoice={invoice} companyLogo="/logo.png" />;
}
```

### 2. `InvoicePdfPreview`

화면 프리뷰 + 인쇄/다운로드 버튼이 포함된 Client Component입니다.

**Props:**

- `invoice` (Invoice): 견적서 데이터 객체
- `companyLogo?` (string): 회사 로고 URL (선택사항)
- `onDownloadPdf?` (() => void): PDF 다운로드 핸들러 (선택사항)

**사용 예시:**

```tsx
"use client";

import { InvoicePdfPreview } from "@/components/invoice/invoice-pdf-preview";

export default function InvoicePreviewPage() {
  const invoice = {
    // Invoice 타입 데이터
  };

  const handleDownload = () => {
    // TODO: PDF 생성 API 호출
    console.log("PDF 다운로드");
  };

  return (
    <InvoicePdfPreview
      invoice={invoice}
      companyLogo="/logo.png"
      onDownloadPdf={handleDownload}
    />
  );
}
```

## 주요 기능

### 1. A4 사이즈 레이아웃

- 210mm x 297mm 비율 유지
- 인쇄 시 여백 최적화 (15mm)
- 반응형 디자인으로 모바일에서도 프리뷰 가능

### 2. 인쇄 최적화

`globals.css`의 `@media print` 스타일을 활용:

- 헤더, 푸터, 버튼 자동 숨김 (`.no-print` 클래스)
- 배경색 제거 (잉크 절약)
- 테두리 색상 조정 (가독성 향상)
- 페이지 나누기 최적화 (`.invoice-section` 단위)

### 3. 섹션 구조

각 섹션은 `.invoice-section` 클래스로 분리되어 페이지 나누기 시 유지됩니다:

1. **헤더**: 회사 정보 + 견적서 번호/날짜
2. **수신자 정보**: 고객 연락처
3. **항목 테이블**: 품목명, 수량, 단가, 금액
4. **합계**: 소계, 부가세, 총액
5. **비고**: 결제 조건 및 노트
6. **푸터**: 안내 문구

## 스타일링 가이드

### 화면 프리뷰용 클래스

```css
.invoice-pdf-wrapper {
  min-height: 100vh;
  padding: 2rem 1rem;
}

.invoice-page {
  max-w-4xl mx-auto;
  bg-white shadow-lg;
}
```

### 인쇄용 클래스

```css
@media print {
  .no-print {
    display: none !important;
  }

  .invoice-section {
    page-break-inside: avoid;
  }
}
```

## 반응형 디자인

### 데스크톱 (>768px)

- 최대 너비 4xl (896px)
- 그림자 효과로 종이 느낌
- A4 비율 유지

### 모바일 (<768px)

- 전체 너비 사용
- 패딩 축소
- 최소 높이 제거 (스크롤 최적화)

## 커스터마이징

### 1. 회사 로고 추가

```tsx
<InvoicePdfPreview
  invoice={invoice}
  companyLogo="https://example.com/logo.png"
/>
```

### 2. 부가세율 변경

`invoice-pdf-template.tsx`의 세금 계산 로직 수정:

```tsx
const tax = invoice.tax || subtotal * 0.1; // 10% → 원하는 세율로 변경
```

### 3. 통화 형식 변경

`lib/utils/invoice.ts`의 `formatCurrency` 함수 수정

### 4. 색상 테마 변경

`globals.css`의 CSS 변수 활용:

- `--primary`: 주요 색상
- `--border`: 테두리 색상
- `--muted-foreground`: 보조 텍스트 색상

## PDF 다운로드 구현 (향후 작업)

현재는 브라우저 인쇄 기능만 제공됩니다. PDF 자동 생성을 위해서는:

### 옵션 1: 클라이언트 사이드 (html2canvas + jsPDF)

```bash
npm install html2canvas jspdf
```

```tsx
const handleDownload = async () => {
  const element = document.querySelector(".invoice-page");
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
};
```

### 옵션 2: 서버 사이드 (Puppeteer)

```bash
npm install puppeteer
```

API 라우트 생성:

```tsx
// app/api/invoice/pdf/route.ts
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  const { invoiceId } = await request.json();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASE_URL}/invoice/${invoiceId}`, {
    waitUntil: "networkidle2",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${invoiceId}.pdf"`,
    },
  });
}
```

## 데모 페이지

`/invoice-pdf-demo` 경로에서 템플릿을 미리 볼 수 있습니다.

```bash
npm run dev
# http://localhost:3000/invoice-pdf-demo
```

## 트러블슈팅

### 1. 인쇄 시 색상이 나오지 않음

브라우저 인쇄 설정에서 "배경 그래픽" 옵션 활성화 필요

### 2. 페이지 나누기가 이상함

`.invoice-section` 클래스가 각 섹션에 적용되어 있는지 확인

### 3. 모바일에서 레이아웃이 깨짐

`globals.css`의 반응형 스타일이 적용되어 있는지 확인

## 관련 파일

- `components/invoice/invoice-pdf-template.tsx`: 순수 템플릿 컴포넌트
- `components/invoice/invoice-pdf-preview.tsx`: 프리뷰 + 버튼 컴포넌트
- `app/globals.css`: 인쇄 최적화 스타일
- `lib/types/invoice.ts`: Invoice 타입 정의
- `lib/utils/invoice.ts`: 유틸리티 함수
