# 인보이스 컴포넌트

견적서/인보이스 관련 UI 컴포넌트 모음입니다.

## 컴포넌트 목록

### 1. InvoiceCard

견적서 목록용 카드 컴포넌트

**위치:** `components/invoice/invoice-card.tsx`

**용도:** 견적서 목록 페이지에서 각 견적서를 카드 형태로 표시

### 2. InvoicePdfTemplate

PDF 출력용 템플릿 컴포넌트

**위치:** `components/invoice/invoice-pdf-template.tsx`

**용도:** A4 사이즈 기준 인쇄 가능한 견적서 레이아웃

**특징:**

- A4 사이즈 (210mm x 297mm) 최적화
- 인쇄 미디어 쿼리 지원
- 반응형 디자인
- 섹션별 페이지 나누기 최적화

### 3. InvoicePdfPreview

PDF 프리뷰 및 액션 버튼 컴포넌트

**위치:** `components/invoice/invoice-pdf-preview.tsx`

**용도:** 화면에서 PDF를 미리보고 인쇄/다운로드 기능 제공

**특징:**

- Client Component (인쇄 기능 포함)
- 인쇄하기 버튼
- PDF 다운로드 버튼 (커스텀 핸들러 지원)
- Sticky 액션 바

### 4. PdfDownloadButton

PDF 다운로드 버튼 컴포넌트

**위치:** `components/invoice/pdf-download-button.tsx`

**용도:** 개별적으로 사용 가능한 PDF 다운로드 버튼

## 사용 예시

### 기본 사용법

```tsx
import { InvoicePdfPreview } from "@/components/invoice";

export default function InvoicePage({ invoiceId }: { invoiceId: string }) {
  const invoice = await getInvoice(invoiceId);

  return <InvoicePdfPreview invoice={invoice} />;
}
```

### 회사 로고 포함

```tsx
<InvoicePdfPreview invoice={invoice} companyLogo="/logo.png" />
```

### 커스텀 다운로드 핸들러

```tsx
const handleDownload = async () => {
  const response = await fetch("/api/invoice/pdf", {
    method: "POST",
    body: JSON.stringify({ invoiceId: invoice.id }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${invoice.invoiceNumber}.pdf`;
  a.click();
};

<InvoicePdfPreview invoice={invoice} onDownloadPdf={handleDownload} />;
```

## 스타일 가이드

### CSS 클래스

- `.invoice-pdf-wrapper`: PDF 전체 래퍼
- `.invoice-page`: A4 페이지 컨테이너
- `.invoice-section`: 페이지 나누기 단위 섹션
- `.no-print`: 인쇄 시 숨김 처리

### 인쇄 최적화

`app/globals.css`에 정의된 `@media print` 스타일:

- 헤더/푸터/버튼 숨김
- 배경색 제거
- 테두리 색상 조정
- A4 페이지 크기 설정

## 타입 정의

```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  issuer: Party;
  recipient: Party;
  items: InvoiceItem[];
  subtotal?: number;
  tax?: number;
  totalAmount: number;
  notes?: string;
}
```

전체 타입은 `lib/types/invoice.ts` 참조

## 데모

`/invoice-pdf-demo` 페이지에서 실제 동작 확인 가능

```bash
npm run dev
# http://localhost:3000/invoice-pdf-demo
```

## 관련 문서

- [PDF 템플릿 상세 가이드](../../docs/guides/invoice-pdf-template-guide.md)
- [Invoice 타입 정의](../../lib/types/invoice.ts)
- [유틸리티 함수](../../lib/utils/invoice.ts)
