/**
 * @react-pdf/renderer 기반 견적서 PDF 템플릿 컴포넌트
 * 웹 페이지(app/invoice/[id]/page.tsx)와 유사한 레이아웃으로 PDF 문서를 렌더링합니다.
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Invoice } from "@/lib/types/invoice";
import { formatCurrency, formatDate, getStatusLabel } from "@/lib/utils/invoice";

// 한글 폰트 등록 (Noto Sans KR)
console.log("Registering Noto Sans KR font from Google Fonts CDN");
try {
  Font.register({
    family: "NotoSansKR",
    src: "https://fonts.gstatic.com/s/notosanskr/v27/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.ttf",
  });
  console.log("Font registration completed");
} catch (fontError) {
  console.error("Font registration failed:", fontError);
  // 폰트 등록 실패 시에도 계속 진행 (기본 폰트 사용)
}

// PDF 스타일 정의
const styles = StyleSheet.create({
  // 페이지 기본 스타일
  page: {
    padding: 40,
    fontFamily: "NotoSansKR",
    fontSize: 10,
    backgroundColor: "#ffffff",
  },

  // 헤더 영역: 견적서 번호, 발행일, 상태
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 5,
  },
  status: {
    fontSize: 10,
    color: "#333333",
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    alignSelf: "flex-start",
  },

  // 발행자/수신자 정보 영역
  partySection: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  partyBox: {
    flex: 1,
    padding: 12,
    border: "1px solid #e0e0e0",
    borderRadius: 4,
    backgroundColor: "#fafafa",
  },
  partyTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  partyText: {
    fontSize: 9,
    marginBottom: 4,
    color: "#333333",
  },
  partyLabel: {
    fontSize: 9,
    color: "#666666",
  },

  // 견적 항목 테이블
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderBottom: "1px solid #e0e0e0",
    borderTop: "1px solid #e0e0e0",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottom: "1px solid #f0f0f0",
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  tableCellName: {
    flex: 2,
    fontSize: 9,
  },
  tableCellRight: {
    flex: 1,
    fontSize: 9,
    textAlign: "right",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  itemName: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 8,
    color: "#666666",
    marginTop: 2,
  },

  // 합계 금액 영역
  totalSection: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 10,
    color: "#666666",
  },
  totalValue: {
    fontSize: 10,
    color: "#333333",
  },

  // 총 금액 (강조)
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTop: "2px solid #e0e0e0",
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },

  // 비고 영역
  notesSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid #e0e0e0",
  },
  notesLabel: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: "#333333",
    lineHeight: 1.5,
  },
});

/**
 * InvoicePDFTemplate Props 인터페이스
 */
export interface InvoicePDFTemplateProps {
  invoice: Invoice;
}

/**
 * 견적서 PDF 템플릿 컴포넌트
 * @param invoice - 견적서 데이터
 * @returns PDF Document
 */
export function InvoicePDFTemplate({ invoice }: InvoicePDFTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더: 견적서 번호, 발행일, 유효기간, 상태 */}
        <View style={styles.header}>
          <Text style={styles.title}>{invoice.invoiceNumber}</Text>
          <Text style={styles.subtitle}>
            발행일: {formatDate(invoice.issueDate)}
          </Text>
          <Text style={styles.subtitle}>
            유효기간: {formatDate(invoice.dueDate)}
          </Text>
          <Text style={styles.status}>
            상태: {getStatusLabel(invoice.status)}
          </Text>
        </View>

        {/* 발행자/수신자 정보 */}
        <View style={styles.partySection}>
          {/* 발행자 정보 */}
          <View style={styles.partyBox}>
            <Text style={styles.partyTitle}>발행자 정보</Text>
            <Text style={styles.partyText}>{invoice.issuer.name}</Text>
            {invoice.issuer.email && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>이메일: </Text>
                {invoice.issuer.email}
              </Text>
            )}
            {invoice.issuer.phone && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>전화번호: </Text>
                {invoice.issuer.phone}
              </Text>
            )}
            {invoice.issuer.address && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>주소: </Text>
                {invoice.issuer.address}
              </Text>
            )}
          </View>

          {/* 수신자 정보 */}
          <View style={styles.partyBox}>
            <Text style={styles.partyTitle}>수신자 정보</Text>
            <Text style={styles.partyText}>{invoice.recipient.name}</Text>
            {invoice.recipient.email && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>이메일: </Text>
                {invoice.recipient.email}
              </Text>
            )}
            {invoice.recipient.phone && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>전화번호: </Text>
                {invoice.recipient.phone}
              </Text>
            )}
            {invoice.recipient.address && (
              <Text style={styles.partyText}>
                <Text style={styles.partyLabel}>주소: </Text>
                {invoice.recipient.address}
              </Text>
            )}
          </View>
        </View>

        {/* 견적 항목 테이블 */}
        <View style={styles.table}>
          {/* 테이블 헤더 */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellName, styles.tableCellHeader]}>
              항목명
            </Text>
            <Text style={[styles.tableCellRight, styles.tableCellHeader]}>
              수량
            </Text>
            <Text style={[styles.tableCellRight, styles.tableCellHeader]}>
              단가
            </Text>
            <Text style={[styles.tableCellRight, styles.tableCellHeader]}>
              금액
            </Text>
          </View>

          {/* 테이블 본문 */}
          {invoice.items.length === 0 ? (
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.tableCellName,
                  { textAlign: "center", color: "#999999" },
                ]}
              >
                등록된 항목이 없습니다.
              </Text>
            </View>
          ) : (
            invoice.items.map((item, index) => (
              <View key={item.id || index} style={styles.tableRow}>
                <View style={styles.tableCellName}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  )}
                </View>
                <Text style={styles.tableCellRight}>{item.quantity}</Text>
                <Text style={styles.tableCellRight}>
                  {formatCurrency(item.unitPrice)}
                </Text>
                <Text style={styles.tableCellRight}>
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* 합계 금액 */}
        <View style={styles.totalSection}>
          {/* 소계 */}
          {invoice.subtotal !== undefined && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>소계</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(invoice.subtotal)}
              </Text>
            </View>
          )}

          {/* 부가세 */}
          {invoice.tax !== undefined && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>부가세</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(invoice.tax)}
              </Text>
            </View>
          )}

          {/* 총 금액 */}
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>총 금액</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(invoice.totalAmount)}
            </Text>
          </View>

          {/* 비고 */}
          {invoice.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>비고</Text>
              <Text style={styles.notesText}>{invoice.notes}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
