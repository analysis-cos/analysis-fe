import type { ServiceRequirementDomainId } from './serviceRequirementCatalog';

export interface ServiceMockMetric {
  label: string;
  value: string;
  helper: string;
}

export interface ServiceMockRow {
  title: string;
  subtitle: string;
  meta: string[];
  status: string;
}

export interface ServiceMockPreview {
  domainId: ServiceRequirementDomainId;
  title: string;
  description: string;
  metrics: ServiceMockMetric[];
  rows: ServiceMockRow[];
  notes: string[];
}

export const SERVICE_MOCK_PREVIEWS: Record<ServiceRequirementDomainId, ServiceMockPreview> = {
  WORKSPACE: {
    domainId: 'WORKSPACE',
    title: '워크스페이스 샘플',
    description: '계정, 조직, 권한, 작업 이력, 고객센터, 사용자 태그가 어떻게 보일지 확인합니다.',
    metrics: [
      { label: '활성 사용자', value: '18명', helper: '마케팅팀/브랜드팀 기준' },
      { label: '조직', value: '4개', helper: '브랜드별 워크스페이스' },
      { label: '조회 전용', value: '6명', helper: '외부 파트너 계정' },
    ],
    rows: [
      { title: '김마케팅', subtitle: 'Brand Growth TF · 관리자', meta: ['리포트 생성 12회', '엑셀 다운로드 4회'], status: '활성' },
      { title: '박브랜드', subtitle: 'Brand Team A · 일반 사용자', meta: ['상품 즐겨찾기 21개', '태그 8개'], status: '활성' },
      { title: '외부 파트너', subtitle: 'Agency Viewer · 조회 전용', meta: ['캠페인 리포트 조회', '다운로드 제한'], status: '권한 제한' },
    ],
    notes: ['계정 생성/권한 변경/작업 이력 저장은 백엔드 연결이 필요합니다.', '고객센터와 FAQ는 정적 콘텐츠부터 시작할 수 있습니다.'],
  },
  PRODUCT: {
    domainId: 'PRODUCT',
    title: '상품 샘플',
    description: '상품 기본 정보, 플랫폼 매핑, 리뷰 지표, 태그, 상품군 그룹핑의 표시 방식을 확인합니다.',
    metrics: [
      { label: '등록 상품', value: '124개', helper: '올리브영/쿠팡/네이버 매핑 포함' },
      { label: '리뷰 추이 보유', value: '78개', helper: '공개 스냅샷 또는 수동 업로드' },
      { label: '상품군', value: '31개', helper: '옵션/세트/리뉴얼 묶음' },
    ],
    rows: [
      { title: '메디힐 에센셜 마스크팩 10+1', subtitle: '메디힐 · 마스크/팩 · 올리브영', meta: ['랭킹 1위', '리뷰 18,420', '평점 4.8', '태그: 올영픽'], status: '판매중' },
      { title: '에스트라 아토베리어365 크림', subtitle: '에스트라 · 스킨케어 · 올리브영/쿠팡', meta: ['할인가 26,400원', '리뷰 12,104', '평점 4.7'], status: '판매중' },
      { title: '달바 퍼스트 스프레이 세럼', subtitle: '달바 · 미스트/세럼 · 올리브영', meta: ['랭킹 +4 상승', '증정 구성 확인', '오늘드림'], status: '프로모션' },
    ],
    notes: ['예상 판매량/매출은 추정 또는 파트너 데이터가 필요합니다.', '리뷰 원문/이미지는 기본 화면에서 요약 중심으로 보여줍니다.'],
  },
  BRAND: {
    domainId: 'BRAND',
    title: '브랜드 샘플',
    description: '브랜드와 상품 연결, 플랫폼 분포, 주요 카테고리, 리뷰 분석 요약을 확인합니다.',
    metrics: [
      { label: '관리 브랜드', value: '16개', helper: '자사/경쟁사 포함' },
      { label: '연결 상품', value: '342개', helper: '동일 상품 매핑 기준' },
      { label: '경쟁 브랜드', value: '9개', helper: '비교 리포트 후보' },
    ],
    rows: [
      { title: '메디힐', subtitle: '마스크/팩 · 스킨케어', meta: ['대표 상품 28개', '만족 요인: 진정/수분', '주요 플랫폼: 올리브영'], status: '자사' },
      { title: '토리든', subtitle: '스킨케어 · 세럼', meta: ['대표 상품 14개', '만족 요인: 속건조', '경쟁 비교 대상'], status: '경쟁' },
      { title: '달바', subtitle: '선케어 · 미스트', meta: ['대표 상품 19개', '검색 키워드 42개', '리뷰 증가 관찰'], status: '관찰' },
    ],
    notes: ['브랜드별 예상 판매량/매출은 파트너 데이터 또는 추정 모델이 필요합니다.', '브랜드 키워드 오타/약칭은 사용자 정의 태그로 관리할 수 있습니다.'],
  },
  KEYWORD: {
    domainId: 'KEYWORD',
    title: '키워드 샘플',
    description: '소재 메시지와 연결되는 관심 표현과 상품 반응을 확인합니다.',
    metrics: [
      { label: '추적 키워드', value: '86개', helper: '상품명/성분/라인명 포함' },
      { label: '관심 표현', value: '24개', helper: '소재 메시지 후보' },
      { label: '라이징 키워드', value: '12개', helper: '7일 관심 증가 기준' },
    ],
    rows: [
      { title: '수분 선크림', subtitle: '수분감 메시지 반응 상승', meta: ['상위 상품 집중', '등록 상품 214개'], status: '상승' },
      { title: '진정 패드', subtitle: '진정/민감 표현 유지', meta: ['리뷰수 상위 상품 집중', '가격대 18,000-29,000원'], status: '유지' },
      { title: 'PDRN 앰플', subtitle: '탄력·재생 표현 급상승', meta: ['상품수 +18%', '메디큐브 노출 강함'], status: '급상승' },
    ],
    notes: ['관심 표현은 플랫폼별 데이터 연동 상태에 따라 범위가 달라집니다.', '상품 영향도는 추정값과 원천값을 구분해서 표시해야 합니다.'],
  },
  RANK: {
    domainId: 'RANK',
    title: '랭킹 샘플',
    description: '플랫폼/카테고리/키워드 랭킹과 스냅샷, 급증감 탐지 화면을 확인합니다.',
    metrics: [
      { label: '저장 스냅샷', value: '1,248개', helper: '일/주/월 재현용' },
      { label: '급상승 상품', value: '17개', helper: '7일 기준' },
      { label: '급하락 상품', value: '6개', helper: '알림 후보' },
    ],
    rows: [
      { title: '올리브영 선케어 랭킹', subtitle: '라운드랩 자작나무 선크림', meta: ['42위 → 18위', '24위 상승', '기준 스냅샷 있음'], status: '급상승' },
      { title: '네이버 쇼핑 키워드 랭킹', subtitle: '수분 선크림', meta: ['3위 유지', '광고/비광고 구분 필요'], status: '유지' },
      { title: '쿠팡 카테고리 랭킹', subtitle: '진정 패드', meta: ['12위 → 19위', '7위 하락', '가격 변경 확인'], status: '주의' },
    ],
    notes: ['랭킹은 낮을수록 좋은 값입니다.', '랭킹 급변은 광고, 할인, 품절, 증정 등 혼선 요인을 함께 봐야 합니다.'],
  },
  REPORT: {
    domainId: 'REPORT',
    title: '리포트 샘플',
    description: '랭킹 현황, 브랜드 비교, 상품/시장/키워드 트렌드 리포트 생성 목록을 확인합니다.',
    metrics: [
      { label: '생성 리포트', value: '38개', helper: '최근 30일' },
      { label: '예약 리포트', value: '7개', helper: '주간/월간 발행' },
      { label: '다운로드 대기', value: '4개', helper: '엑셀/PDF export' },
    ],
    rows: [
      { title: '랭킹 현황 리포트', subtitle: '올리브영 · 선케어 · 7일', meta: ['대시보드 생성 완료', 'PDF 준비 중'], status: '생성 완료' },
      { title: '브랜드 비교 리포트', subtitle: '메디힐 vs 토리든 vs 달바', meta: ['상품 42개 비교', '리뷰 반응 요약 포함'], status: '초안' },
      { title: '키워드 급상승 트렌드 리포트', subtitle: 'PDRN 앰플 · 30일', meta: ['라이징 상품 12개', '가격/리뷰 추이 포함'], status: '예약' },
    ],
    notes: ['엑셀/PDF 파일 생성과 다운로드 이력 저장은 백엔드가 필요합니다.', '추정 매출은 명확히 추정값으로 표시해야 합니다.'],
  },
  ALERT: {
    domainId: 'ALERT',
    title: '알림 샘플',
    description: '랭킹 현황, 급변, 경쟁 브랜드 변화 알림 조건과 이력을 확인합니다.',
    metrics: [
      { label: '활성 조건', value: '22개', helper: '상품/브랜드/키워드 기준' },
      { label: '오늘 알림', value: '5건', helper: '확인 대기 2건' },
      { label: '경쟁 급상승', value: '3건', helper: '브랜드 비교 대상' },
    ],
    rows: [
      { title: '일별 랭킹 현황 알림', subtitle: '매일 00:00 · 올리브영 선케어', meta: ['대상 상품 18개', '슬랙/메일 예정'], status: '활성' },
      { title: '랭킹 급변 알림', subtitle: '10위 이상 상승/하락', meta: ['메디힐 마스크팩 +12위', '담당자 확인 대기'], status: '발송됨' },
      { title: '경쟁 브랜드 급상승 알림', subtitle: '토리든 · 달바 · 라운드랩', meta: ['라이징 상품 3개', '리포트 연결 가능'], status: '관찰' },
    ],
    notes: ['실제 알림 발송, 확인 처리, 조건 저장은 백엔드가 필요합니다.', '프론트엔드는 조건 설정과 이력 확인 화면을 먼저 구성할 수 있습니다.'],
  },
};
