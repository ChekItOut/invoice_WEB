# Vercel 배포 가이드

**노션 기반 견적서 관리 시스템** Vercel 배포 가이드입니다.

---

## 사전 준비

### 필수 요구사항

- ✅ Vercel 계정 (https://vercel.com에서 무료 가입)
- ✅ GitHub 저장소 (프로젝트 코드 push 완료)
- ✅ Notion Integration Token (NOTION_API_KEY)
- ✅ Notion Database ID (NOTION_DATABASE_ID)

### 로컬 빌드 검증

배포 전 로컬에서 프로덕션 빌드가 성공하는지 확인:

```bash
npm run build
```

**예상 결과**:
```
✓ Compiled successfully in 9.4s
✓ Generating static pages using 7 workers (11/11) in 3.1s
✓ Finalizing page optimization ...
```

---

## 배포 방법

### 방법 1: Vercel 웹 대시보드 (권장)

가장 간단하고 빠른 방법입니다.

#### 1.1 Vercel에 프로젝트 연결

1. https://vercel.com/dashboard 접속
2. **"Add New Project"** 클릭
3. GitHub 저장소 선택
   - GitHub 연동이 안 되어 있다면 **"Import Git Repository"** 클릭
   - 권한 승인 후 저장소 선택
4. 프로젝트 설정:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `.` (기본값)
   - **Build Command**: `next build` (기본값)
   - **Output Directory**: `.next` (기본값)

#### 1.2 환경 변수 설정

**중요**: 배포 전 환경 변수를 반드시 등록해야 합니다.

1. **Environment Variables** 섹션에서 다음 변수 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NOTION_API_KEY` | `secret_xxxxxxxxxxxx` | Notion Integration Token |
| `NOTION_DATABASE_ID` | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | Notion Database ID |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.vercel.app` | (선택) 사이트 기본 URL |

2. **Environment** 선택:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

3. **"Deploy"** 클릭

#### 1.3 배포 진행 상황 확인

- 배포가 시작되면 실시간 로그 확인 가능
- 빌드 완료 후 배포 URL 자동 생성: `https://your-project.vercel.app`

---

### 방법 2: Vercel CLI

터미널에서 직접 배포하는 방법입니다.

#### 2.1 Vercel CLI 설치

```bash
npm install -g vercel
```

#### 2.2 Vercel 로그인

```bash
vercel login
```

브라우저에서 인증 후 터미널로 돌아옵니다.

#### 2.3 프로젝트 연결

```bash
vercel link
```

질문에 답변:
- **Set up and deploy?** → Y
- **Which scope?** → 개인 계정 선택
- **Link to existing project?** → N (처음) / Y (기존 프로젝트)
- **Project name?** → 프로젝트 이름 입력

#### 2.4 환경 변수 등록

```bash
vercel env add NOTION_API_KEY
# 값 입력 후 Production, Preview, Development 선택

vercel env add NOTION_DATABASE_ID
# 값 입력 후 Production, Preview, Development 선택
```

#### 2.5 배포 실행

```bash
vercel --prod
```

**배포 URL 확인**:
```
✓ Production: https://your-project.vercel.app
```

---

## 배포 후 검증

### 1. 기본 기능 테스트

배포 URL로 접속하여 다음 항목 확인:

| 항목 | 테스트 방법 | 예상 결과 |
|------|------------|----------|
| **홈 페이지** | `https://your-project.vercel.app` 접속 | 정상 로딩 |
| **견적서 페이지** | `/invoice/[실제-ID]` 접속 | 견적서 정보 표시 |
| **PDF 다운로드** | PDF 다운로드 버튼 클릭 | `견적서_[번호].pdf` 다운로드 |
| **404 페이지** | `/invoice/invalid-id` 접속 | 에러 페이지 표시 |
| **robots.txt** | `/robots.txt` 접속 | 크롤링 규칙 표시 |
| **sitemap.xml** | `/sitemap.xml` 접속 | 사이트맵 XML 표시 |
| **manifest** | `/manifest.webmanifest` 접속 | 앱 매니페스트 JSON 표시 |

### 2. Notion API 연동 확인

견적서 페이지에서 다음 확인:
- ✅ 견적서 번호, 발행일, 상태 표시
- ✅ 발행자/수신자 정보 표시
- ✅ 견적 항목 테이블 표시
- ✅ 총 금액 계산 정확성

### 3. 성능 측정 (Lighthouse)

Chrome DevTools → Lighthouse 실행:

```bash
# 또는 CLI로 측정
npx lighthouse https://your-project.vercel.app --view
```

**목표 점수**:
- ✅ Performance: 90점 이상
- ✅ Accessibility: 90점 이상
- ✅ Best Practices: 90점 이상
- ✅ SEO: 90점 이상

---

## 환경 변수 관리

### Vercel 대시보드에서 관리

1. 프로젝트 선택 → **Settings** 탭
2. **Environment Variables** 메뉴
3. 변수 추가/수정/삭제
4. **Redeploy** 버튼으로 재배포 (환경 변수 변경 후 필수)

### CLI로 관리

```bash
# 환경 변수 목록 확인
vercel env ls

# 환경 변수 추가
vercel env add VARIABLE_NAME

# 환경 변수 제거
vercel env rm VARIABLE_NAME production
```

---

## 자동 배포 설정

### GitHub 연동 시 자동 배포

Vercel은 Git 기반 배포를 지원합니다:

- **main/master 브랜치 push** → 프로덕션 배포
- **다른 브랜치 push** → 프리뷰 배포 (고유 URL 생성)
- **Pull Request 생성** → 프리뷰 배포 + PR 코멘트에 URL 추가

### 자동 배포 비활성화

프로젝트 Settings → Git → **Production Branch** 설정 변경

---

## 커스텀 도메인 설정 (선택)

### 도메인 연결

1. Vercel 대시보드 → **Settings** → **Domains**
2. **Add** 버튼 클릭
3. 도메인 입력 (예: `invoice.yourdomain.com`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 레코드 추가:

**A 레코드**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 레코드** (서브도메인):
```
Type: CNAME
Name: invoice
Value: cname.vercel-dns.com
```

5. DNS 전파 대기 (최대 48시간, 보통 수분 내)
6. Vercel에서 자동으로 SSL 인증서 발급

---

## 문제 해결

### 1. 빌드 실패

**증상**: Vercel 빌드 로그에 에러 표시

**해결**:
1. 로컬에서 `npm run build` 실행 확인
2. `package.json`의 `engines` 필드 확인:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```
3. Vercel 빌드 로그 확인하여 에러 메시지 분석

### 2. 환경 변수 오류

**증상**: "서버 설정 오류: Notion API 키가 설정되지 않았습니다."

**해결**:
1. Vercel 대시보드에서 환경 변수 확인
2. Production 환경에 변수가 등록되어 있는지 확인
3. 변수 이름 오타 확인 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
4. 환경 변수 변경 후 **Redeploy** 필수

### 3. Notion API 연결 실패

**증상**: 견적서 페이지에서 Notion API 오류 표시

**해결**:
1. Notion Integration에 데이터베이스 권한 부여 확인
2. Notion Database ID 정확성 확인
3. Notion API 키 유효성 확인 (만료되지 않았는지)

### 4. PDF 다운로드 실패

**증상**: PDF 다운로드 버튼 클릭 시 에러

**해결**:
1. 폰트 파일 경로 확인 (`public/fonts/NotoSansKR-Regular.ttf`)
2. Vercel 빌드 로그에서 폰트 파일이 포함되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

---

## Vercel Analytics 활성화 (선택)

실시간 성능 모니터링 및 사용자 통계 확인:

1. Vercel 대시보드 → **Analytics** 탭
2. **Enable Analytics** 클릭
3. 배포 후 실시간 데이터 확인:
   - 페이지 뷰
   - 고유 방문자
   - Core Web Vitals
   - 지역별 접속 통계

---

## 배포 체크리스트

배포 전 최종 확인:

- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] 환경 변수 (NOTION_API_KEY, NOTION_DATABASE_ID) 준비
- [ ] GitHub 저장소에 코드 push 완료
- [ ] Vercel 계정 생성 및 로그인
- [ ] Vercel에 프로젝트 연결
- [ ] 환경 변수 등록 (Production, Preview, Development)
- [ ] 배포 실행
- [ ] 배포 URL로 기본 기능 테스트
- [ ] Notion API 연동 확인
- [ ] PDF 다운로드 테스트
- [ ] Lighthouse 성능 측정 (90점 이상 목표)

---

## 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel CLI 사용법](https://vercel.com/docs/cli)
- [환경 변수 관리](https://vercel.com/docs/concepts/projects/environment-variables)
- [커스텀 도메인 설정](https://vercel.com/docs/concepts/projects/domains)

---

**배포 완료 후 프로젝트 URL**: `https://your-project.vercel.app`

**문의 및 지원**: Vercel Support (help@vercel.com)
