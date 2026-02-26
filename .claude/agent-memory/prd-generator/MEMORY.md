# PRD Generator - 프로젝트 메모리

## 프로젝트 정보
- 프로젝트: 노션 기반 견적서 관리 시스템
- 기술 스택: Next.js 16.1.6 + TypeScript 5 + TailwindCSS v4 + shadcn/ui
- PRD 문서 위치: `docs/PRD.md`
- 상세 분석 문서: `C:\Users\danie\.claude\plans\shimmering-conjuring-sphinx-agent-ad149a4.md`

## 사용자 선호
- 언어: 한국어 (코드 주석, 문서, 커밋 메시지 포함)
- 변수/함수명: 영어
- PRD 스타일: 1인 개발자 친화적, 모호한 표현 금지, 즉시 개발 가능한 수준의 상세도
- PDF 라이브러리: MVP에서는 jsPDF + html2canvas 선택 (경량)

## 핵심 결정 사항
- Notion을 백엔드 DB로 사용 (읽기 전용)
- 공개 ID는 UUID v4 (Notion 내부 ID 비노출)
- Draft 상태 견적서는 API에서 404 반환 (비공개)
- PDF 생성은 클라이언트 사이드 (서버 부하 없음)
- 모바일 품목 테이블은 카드형 리스트로 대체
