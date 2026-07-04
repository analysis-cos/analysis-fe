export const servicePrinciples = [
  {
    title: '콘텐츠',
    description: '유튜브, 인스타그램, 틱톡 등에서 어떤 소재와 크리에이터가 반응을 만드는지 확인합니다.',
    metrics: ['조회수', '좋아요', '댓글', '공유', '참여수', '참여율'],
  },
  {
    title: '커머스',
    description: '네이버, 쿠팡, 올리브영 등 판매 채널에서 상품 반응과 랭킹 변화를 확인합니다.',
    metrics: ['랭킹', '가격', '할인율', '리뷰수', '평점', '상품 반응'],
  },
  {
    title: '소비자 시그널',
    description: '댓글과 리뷰에서 반복되는 만족 요인과 불만 요인을 확인합니다.',
    metrics: ['구매 사유', '불만 요인', '반복 표현', '리뷰 반응'],
  },
];

export const serviceProblems = [
  '수작업 중심 데이터 수집과 분석으로 반복 업무가 많음',
  '소셜, 콘텐츠, 커머스, 리뷰 반응이 서로 분리되어 있음',
  '콘텐츠 성과와 실제 비즈니스 성과의 연결이 약함',
  '크리에이터의 실제 영향력과 구매 기여도를 측정하기 어려움',
  '버티컬 커머스와 글로벌 커머스가 늘면서 판매 채널이 파편화됨',
];

export type FeaturePageId =
  | 'trend-content'
  | 'keyword-reference'
  | 'content-type-analysis'
  | 'brand-competitor-mentions'
  | 'creator-deep-analysis'
  | 'content-library'
  | 'realtime-ranking'
  | 'leading-product-analysis'
  | 'rising-product-detection'
  | 'market-trend-voc'
  | 'owned-review-analysis'
  | 'competitor-review-analysis';

export type FeatureCategory = 'leading' | 'lagging';

export interface FeatureCard {
  id: FeaturePageId;
  title: string;
  description: string;
  sourceRows: string;
}

export interface FeaturePageDetail extends FeatureCard {
  category: FeatureCategory;
  platforms: string[];
  objective: string;
  primaryMetric: string;
  refresh: string;
  dataInputs: string[];
  screenSections: string[];
  outputs: string[];
  workflow: string[];
  alerts: string[];
  related: FeaturePageId[];
}

export const mediaFeatureCards: FeatureCard[] = [
  {
    id: 'trend-content',
    title: '트렌드 콘텐츠',
    description: '카테고리별 조회수와 인게이지먼트가 높은 콘텐츠·크리에이터를 실시간 확인',
    sourceRows: '미디어 기능 01',
  },
  {
    id: 'keyword-reference',
    title: '키워드 레퍼런스',
    description: '검색 키워드와 연관성이 높은 콘텐츠를 조회수, 참여도 기준으로 탐색',
    sourceRows: '미디어 기능 02',
  },
  {
    id: 'content-type-analysis',
    title: '콘텐츠 유형 분석',
    description: '추천, 리뷰, 정보형, VLOG, 룩북, 밈, 챌린지 등 콘텐츠 주제별 성과 비교',
    sourceRows: '미디어 기능 03',
  },
  {
    id: 'brand-competitor-mentions',
    title: '자사·경쟁사 언급',
    description: '브랜드와 상품이 언급된 콘텐츠를 자사/경쟁사 기준으로 분리',
    sourceRows: '미디어 기능 04-05',
  },
  {
    id: 'creator-deep-analysis',
    title: '크리에이터 심층 분석',
    description: '크리에이터의 타깃 적합도와 콘텐츠 반응을 함께 조회',
    sourceRows: '미디어 기능 06',
  },
  {
    id: 'content-library',
    title: '콘텐츠 보관함',
    description: '콘텐츠와 크리에이터를 찜, 폴더링, 메모로 캠페인 후보 관리',
    sourceRows: '미디어 기능 07',
  },
];

export const mediaMetrics = [
  { group: '계정', label: '계정명 / 계정 ID / 계정 URL', type: '원천', description: '계정 홈과 URL 기준 기본 식별자' },
  { group: '계정', label: '구독자·팔로워 / 월 성장률', type: '원천·계산', description: '이번달 대비 지난달 성장률을 계산' },
  { group: '계정', label: '산업·카테고리 / 주요 콘텐츠', type: '파생', description: '뷰티, 푸드, 리빙 및 리뷰, 추천, VLOG 등 분류' },
  { group: '계정', label: '주요 콘텐츠 형식', type: '계산', description: '롱폼, 숏폼, 피드, 릴스, 이미지·동영상 비율' },
  { group: '계정', label: '광고 밀도', type: '계산', description: '유료 광고 콘텐츠수 / 전체 콘텐츠수' },
  { group: '콘텐츠', label: '조회수 / 좋아요 / 댓글 / 공유', type: '원천', description: '콘텐츠 반응 지표의 기본 원천 데이터' },
  { group: '콘텐츠', label: '참여수 / 참여율', type: '계산', description: '좋아요수/100 + 댓글수 + 공유수, 참여수/조회수' },
  { group: '콘텐츠', label: '브랜드 언급 / 광고 여부', type: '파생', description: '브랜드·상품 언급과 협찬, PPL 포함 여부' },
];

export const mediaPlatformDeepDive = [
  {
    platform: 'YouTube',
    summary: '채널 홈, 영상 상세, 댓글/반응 데이터를 기반으로 콘텐츠 영향력과 크리에이터 적합도를 판단합니다.',
    source: '미디어 참고 자료 / YouTube',
    sections: [
      {
        title: '계정 기본 정보',
        type: '원천',
        items: ['계정명', '계정 ID', '계정 고유 ID', '계정 URL', '프로필 bio', '멀티채널', '구독자', '가입일', '국가', '이메일 주소', '프로필 이미지'],
      },
      {
        title: '계정 분석 정보',
        type: '파생',
        items: ['산업/카테고리', '주요 콘텐츠', '브랜드 언급', '타깃 적합도', '주요 관심사', '구독자 분석'],
      },
      {
        title: '계산 지표',
        type: '계산',
        items: ['롱폼/숏폼 비율', '평균 조회수', '평균 좋아요수', '평균 댓글수', '평균 공유수', '평균 참여수', '업로드 주기', '업로드 시간표', '월 성장률', '광고 밀도', '계정 그룹', '계정 참여도', '영상 참여도', '구독자 대비 조회수'],
      },
      {
        title: '콘텐츠 원천 정보',
        type: '원천',
        items: ['콘텐츠 형식', '콘텐츠 URL', '썸네일', '영상 길이', '업로드일시', '타이틀', '설명', '조회수', '좋아요수', '댓글수', '공유수'],
      },
      {
        title: '콘텐츠 파생 분석',
        type: '파생',
        items: ['콘텐츠 내용', '주요 키워드', '장면 분석', '브랜드 언급', '광고 여부', '유사 콘텐츠', '유사 채널'],
      },
    ],
  },
  {
    platform: 'Instagram',
    summary: '계정 홈, 프로필 bio, 피드/릴스 반응 데이터를 기반으로 숏폼 확산력과 브랜드 언급 품질을 판단합니다.',
    source: '미디어 참고 자료 / Instagram',
    sections: [
      {
        title: '계정 기본 정보',
        type: '원천',
        items: ['계정명', '계정 ID', '계정 고유 ID', '계정 URL', '프로필 bio', '멀티채널', '팔로워수', '가입일', '국가', '이메일 주소', '프로필 이미지'],
      },
      {
        title: '계정 분석 정보',
        type: '파생',
        items: ['산업/카테고리', '주요 콘텐츠', '브랜드 언급', '타깃 적합도', '주요 관심사', '팔로워 분석'],
      },
      {
        title: '계산 지표',
        type: '계산',
        items: ['피드/릴스 비율', '이미지/동영상 비율', '평균 조회수', '평균 좋아요수', '평균 댓글수', '평균 공유수', '평균 참여수', '업로드 주기', '업로드 시간표', '월 성장률', '광고 밀도', '계정 그룹', '계정 참여도', '영상 참여도', '팔로워 대비 조회수'],
      },
      {
        title: '콘텐츠 원천 정보',
        type: '원천',
        items: ['콘텐츠 형식', '콘텐츠 URL', '썸네일', '영상 길이', '업로드일시', '타이틀', '설명/캡션', '조회수', '좋아요수', '댓글수', '공유수'],
      },
      {
        title: '콘텐츠 파생 분석',
        type: '파생',
        items: ['콘텐츠 내용', '주요 키워드', '이미지/장면 분석', '브랜드 언급', '광고 여부', '유사 콘텐츠', '유사 계정'],
      },
    ],
  },
];

export const mediaFormulaNotes = [
  { label: '참여수', formula: '좋아요수 / 100 + 댓글수 + 공유수' },
  { label: '영상 참여도', formula: '참여수 / 조회수' },
  { label: '구독자·팔로워 대비 조회수', formula: '조회수 / 구독자수 또는 팔로워수' },
  { label: '월 성장률', formula: '(이번달 팔로워 - 지난달 팔로워) / 지난달 팔로워 * 100%' },
  { label: '광고 밀도', formula: '최근 유료 광고 콘텐츠수 / 전체 콘텐츠수' },
];

export const creatorGroupGuides = [
  { group: '메가', followers: '30만+', shortViews: '30만+', longViews: '15만+', grade: '최우수 기준' },
  { group: '매크로', followers: '10만+', shortViews: '15만+', longViews: '7.5만+', grade: '우수 이상 후보' },
  { group: '미드', followers: '5만+', shortViews: '7.5만+', longViews: '3.75만+', grade: '캠페인 실험군' },
  { group: '마이크로', followers: '1만+', shortViews: '2.5만+', longViews: '1.25만+', grade: '니치 타겟' },
  { group: '나노', followers: '1만 이하', shortViews: '1만+', longViews: '5천+', grade: '고관여 검증' },
];

export const mediaRequirements = [
  '콘텐츠 기본정보 조회: 플랫폼, 제목, 썸네일, 업로드일, 설명, URL',
  '콘텐츠 플랫폼/형식 분류: 유튜브, 인스타그램, 틱톡 / 숏폼, 롱폼, 라이브 클립',
  '콘텐츠 산업·카테고리 분류: 추천, 리뷰, 정보형, VLOG, TIP, 룩북, 밈, 챌린지',
  '콘텐츠 반응 지표 및 추이 조회: 조회수, 좋아요, 댓글, 공유, 참여수, 참여율',
  '콘텐츠 댓글 분석: 반복 반응과 위험 표현 확인',
  '크리에이터 평균 반응 지표: 평균 조회수, 평균 참여율, 구독자 대비 조회수',
  '캠페인 콘텐츠 모니터링: 링크, 키워드, 추적 기간 기반 자동 추적',
  '브랜드 언급·바이럴 알림: 신규 언급과 급상승 콘텐츠 알림',
];

export const commerceFeatureCards: FeatureCard[] = [
  {
    id: 'realtime-ranking',
    title: '실시간 랭킹 추적',
    description: '플랫폼별 일간 및 실시간 랭킹을 추적하고 등록 상품의 변화 알림을 제공합니다.',
    sourceRows: '커머스 기능 01',
  },
  {
    id: 'leading-product-analysis',
    title: '리딩 상품 분석',
    description: '카테고리/키워드별 상위 상품의 가격, 리뷰, 조회수, 배송, 성분을 비교합니다.',
    sourceRows: '커머스 기능 02',
  },
  {
    id: 'rising-product-detection',
    title: '라이징 상품 탐지',
    description: '랭킹 상승률과 가격·리뷰·상품정보 변화를 기반으로 급상승 이유를 파악합니다.',
    sourceRows: '커머스 기능 03',
  },
  {
    id: 'market-trend-voc',
    title: '시장 반응 요약',
    description: '리뷰와 가격 반응을 바탕으로 시장에서 통하는 메시지와 저항 요인을 점검합니다.',
    sourceRows: '커머스 기능 04',
  },
  {
    id: 'owned-review-analysis',
    title: '자사 리뷰 분석',
    description: '자사 상품 리뷰에서 구매 사유, 만족 요인, 불만 요인을 정리합니다.',
    sourceRows: '커머스 기능 05',
  },
  {
    id: 'competitor-review-analysis',
    title: '경쟁사 리뷰 분석',
    description: '경쟁 상품 리뷰를 세분화해 차별화 포인트와 위험 신호를 찾습니다.',
    sourceRows: '커머스 기능 06',
  },
];

export const commerceMetrics = [
  { platform: '네이버', group: '키워드 검색결과', label: '랭킹 / 브랜드 스토어 / 판매처명', description: '광고·비광고 랭킹 구분과 순위 이탈 기준 필요' },
  { platform: '네이버', group: '검색 반응', label: '관심 키워드 흐름', description: '소재 메시지와 연결되는 관심 표현을 확인' },
  { platform: '네이버', group: '상품', label: '가격 / 배송 / 리뷰 / 성분 / Q&A', description: 'PDP 기반 상품 상세와 리뷰 원천 데이터' },
  { platform: '올리브영', group: '랭킹', label: '전체·카테고리 랭킹', description: '1시간마다 직전 6시간 판매 데이터 기준 업데이트' },
  { platform: '올리브영', group: '랭킹', label: '정상가 / 할인가 / 할인율 / 리뷰수 / 평점', description: '랭킹 페이지의 상품별 공통 지표' },
  { platform: '올리브영', group: '상품', label: '오늘드림 / 증정 / 리뷰 반응', description: '상품 상세 페이지의 커머스 반응 보조 신호' },
];

export const commerceRequirements = [
  '상품 플랫폼 매핑: 동일 상품이 여러 플랫폼에 존재할 경우 하나의 상품으로 연결',
  '상품군 그룹핑: 옵션, 세트, 리뉴얼, 용량 차이 등 유사 상품을 묶음',
  '상품 리뷰 정보 및 추이 조회: 리뷰 수, 평점, 리뷰 내용, 이미지, 등록일 변화',
  '관심 키워드 흐름 조회: 광고 메시지와 연결되는 표현 확인',
  '플랫폼별·카테고리별·기간별 랭킹 조회: 일/주/월 순위 변화 추적',
  '키워드 랭킹 급증감 탐지: 급증, 급감, 순위 유지율이 장기간 지속되는 상품 탐지',
  '상품·시장·키워드 트렌드 리포트: 리딩/라이징 상품의 공통점과 차이점 보고서화',
  '랭킹 급변 알림: 상품 또는 경쟁 브랜드의 급상승·급하락 발생 시 알림',
];

export const featurePageDetails: FeaturePageDetail[] = [
  {
    ...mediaFeatureCards[0],
    category: 'leading',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    objective: '카테고리별로 지금 반응이 커지는 콘텐츠와 크리에이터를 빠르게 찾아 광고 후보로 전환합니다.',
    primaryMetric: '참여율 상위 콘텐츠',
    refresh: '일 1회 수집 + 급상승 알림',
    dataInputs: ['콘텐츠 URL', '플랫폼', '카테고리', '업로드일', '조회수', '좋아요', '댓글', '공유', '썸네일'],
    screenSections: ['카테고리·플랫폼 필터', '급상승 콘텐츠 랭킹', '크리에이터 후보 리스트', '브랜드 언급 여부', '후행 채널 연결 힌트'],
    outputs: ['콘텐츠 트렌드 리포트', '캠페인 후보 콘텐츠', '급상승 키워드', '경쟁 브랜드 노출 리스트'],
    workflow: ['카테고리와 플랫폼을 선택합니다.', '조회수와 참여율이 동시에 오른 콘텐츠를 확인합니다.', '광고 여부와 브랜드 언급을 분리합니다.', '캠페인 후보를 보관함에 저장합니다.'],
    alerts: ['24시간 조회수 급등', '신규 브랜드 언급', '경쟁사 콘텐츠 반응 급증'],
    related: ['keyword-reference', 'creator-deep-analysis', 'content-library'],
  },
  {
    ...mediaFeatureCards[1],
    category: 'leading',
    platforms: ['YouTube', 'Instagram'],
    objective: '검색 키워드와 관련 콘텐츠의 반응을 비교해 어떤 메시지와 소재가 캠페인에 적합한지 판단합니다.',
    primaryMetric: '키워드별 콘텐츠 참여도',
    refresh: '일 1회 수집',
    dataInputs: ['검색 키워드', '콘텐츠 제목', '설명/캡션', '주요 키워드', '조회수', '참여수', '브랜드 언급'],
    screenSections: ['키워드 검색창', '연관 콘텐츠 리스트', '키워드별 반응 차트', '콘텐츠 문장/후킹 패턴', '저장된 레퍼런스'],
    outputs: ['키워드 리포트', '후킹 문구 후보', '레퍼런스 콘텐츠 묶음', '브랜드 적합 키워드'],
    workflow: ['키워드를 입력합니다.', '조회수보다 참여율이 높은 콘텐츠를 우선 정렬합니다.', '반복되는 문장과 썸네일 패턴을 확인합니다.', '캠페인 소재 브리프로 넘깁니다.'],
    alerts: ['키워드 반응 급증', '경쟁 브랜드 키워드 점유 증가', '저장 키워드 신규 콘텐츠 발생'],
    related: ['trend-content', 'content-type-analysis', 'brand-competitor-mentions'],
  },
  {
    ...mediaFeatureCards[2],
    category: 'leading',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    objective: '리뷰, 추천, 정보형, VLOG, 챌린지 등 콘텐츠 유형별 성과를 비교해 캠페인 소재 방향을 정합니다.',
    primaryMetric: '유형별 평균 참여도',
    refresh: '일 1회 수집',
    dataInputs: ['콘텐츠 형식', '영상 길이', '업로드 주기', '조회수', '좋아요', '댓글', '공유', '주요 키워드'],
    screenSections: ['유형별 성과 매트릭스', '플랫폼별 형식 비중', '롱폼/숏폼 비교', '성과 상위 예시', '권장 소재 타입'],
    outputs: ['콘텐츠 유형 분석표', '플랫폼별 소재 가이드', '성과 상위 포맷', '실험군 소재 후보'],
    workflow: ['카테고리를 선택합니다.', '콘텐츠 유형별 평균 반응을 비교합니다.', '플랫폼별로 강한 형식을 분리합니다.', '다음 집행 소재 타입을 결정합니다.'],
    alerts: ['특정 유형 참여율 상승', '릴스/쇼츠 비중 급변', '롱폼 리뷰 성과 회복'],
    related: ['trend-content', 'keyword-reference', 'creator-deep-analysis'],
  },
  {
    ...mediaFeatureCards[3],
    category: 'leading',
    platforms: ['YouTube', 'Instagram'],
    objective: '자사와 경쟁사 언급 콘텐츠를 분리해 브랜드 노출 품질과 광고 밀도를 비교합니다.',
    primaryMetric: '브랜드 언급 콘텐츠수',
    refresh: '일 1회 수집 + 신규 언급 알림',
    dataInputs: ['브랜드명', '상품명', '콘텐츠 내용', '설명/캡션', '댓글 키워드', '광고 여부', '유사 콘텐츠'],
    screenSections: ['자사/경쟁사 토글', '언급량 추이', '광고/비광고 구분', '대표 콘텐츠', '위험 언급 리스트'],
    outputs: ['브랜드 언급 리포트', '경쟁사 캠페인 추정 리스트', '신규 바이럴 알림', '위험 콘텐츠 큐'],
    workflow: ['브랜드와 경쟁 브랜드를 등록합니다.', '언급 콘텐츠를 플랫폼별로 확인합니다.', '광고 여부와 자연 언급을 분리합니다.', '급상승 또는 위험 언급을 액션으로 보냅니다.'],
    alerts: ['경쟁사 신규 캠페인 감지', '자사 부정 언급 증가', '브랜드명 포함 콘텐츠 급증'],
    related: ['trend-content', 'keyword-reference', 'market-trend-voc'],
  },
  {
    ...mediaFeatureCards[4],
    category: 'leading',
    platforms: ['YouTube', 'Instagram'],
    objective: '크리에이터의 계정 품질, 시청자 구성, 콘텐츠 반응을 함께 봐 실제 광고 후보를 선별합니다.',
    primaryMetric: '구독자 대비 조회수',
    refresh: '주 1회 계정 갱신 + 캠페인 전 수동 갱신',
    dataInputs: ['계정명', '구독자/팔로워수', '월 성장률', '평균 조회수', '참여율', '타깃 적합도', '관심사'],
    screenSections: ['계정 요약', '시청자 프로필', '평균 반응 지표', '광고 밀도', '유사 크리에이터'],
    outputs: ['크리에이터 적합도 점수', '캠페인 후보 리스트', '예상 도달 범위', '브랜드 매칭 리포트'],
    workflow: ['후보 크리에이터를 검색합니다.', '계정 그룹과 평균 반응을 확인합니다.', '시청자 구성이 타겟과 맞는지 비교합니다.', '후보를 보관함 또는 캠페인에 연결합니다.'],
    alerts: ['월 성장률 급등', '광고 밀도 과다', '평균 조회수 급락'],
    related: ['trend-content', 'content-type-analysis', 'content-library'],
  },
  {
    ...mediaFeatureCards[5],
    category: 'leading',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    objective: '콘텐츠와 크리에이터 후보를 저장하고 메모, 폴더, 캠페인 상태로 관리합니다.',
    primaryMetric: '캠페인 후보 저장수',
    refresh: '실시간 저장',
    dataInputs: ['콘텐츠 URL', '크리에이터', '메모', '태그', '폴더', '캠페인 상태', '담당자'],
    screenSections: ['저장 콘텐츠 보드', '폴더/태그 필터', '담당자 메모', '캠페인 상태', '선행-후행 연결'],
    outputs: ['캠페인 후보 보드', '레퍼런스 묶음', '담당자별 액션 리스트', '브리프 초안'],
    workflow: ['탐색 중인 콘텐츠를 저장합니다.', '상품, 카테고리, 캠페인 태그를 붙입니다.', '담당자 메모와 우선순위를 남깁니다.', '실제 집행 캠페인으로 전환합니다.'],
    alerts: ['저장 후보 성과 급등', '검토 기한 도래', '후행 성과와 연결된 후보 발생'],
    related: ['trend-content', 'keyword-reference', 'creator-deep-analysis'],
  },
  {
    ...commerceFeatureCards[0],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '판매 채널별 랭킹 변화를 추적해 광고 집행 이후 실제 구매 성과가 따라오는지 봅니다.',
    primaryMetric: '랭킹 상승폭',
    refresh: '일간 + 주요 채널 실시간',
    dataInputs: ['플랫폼', '카테고리', '키워드', '랭킹', '가격', '할인율', '리뷰수', '평점', '판매처'],
    screenSections: ['채널별 랭킹 보드', '상품 등록 리스트', '순위 변화 그래프', '급변 알림', '선행 캠페인 연결'],
    outputs: ['랭킹 현황 리포트', '순위 급변 알림', '판매 채널별 성과표', '후행 성과 요약'],
    workflow: ['추적 상품과 키워드를 등록합니다.', '채널별 랭킹 변화를 확인합니다.', '광고 집행일과 순위 상승 시점을 겹쳐 봅니다.', '급변 상품을 상세 분석으로 넘깁니다.'],
    alerts: ['랭킹 급상승', '랭킹 이탈', '경쟁 상품 진입'],
    related: ['leading-product-analysis', 'rising-product-detection', 'owned-review-analysis'],
  },
  {
    ...commerceFeatureCards[1],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '상위 상품의 가격, 리뷰, 혜택, 배송, 성분을 비교해 시장에서 통하는 상품 조건을 파악합니다.',
    primaryMetric: '카테고리 상위 점유',
    refresh: '일 1회 수집',
    dataInputs: ['상품명', '브랜드', '가격', '할인율', '리뷰수', '평점', '배송', '성분', '상품 이미지', '옵션'],
    screenSections: ['상위 상품 테이블', '가격/할인 비교', '리뷰 볼륨 비교', '상품 정보 차이', '자사 대비 갭'],
    outputs: ['상품 심층 분석 리포트', '경쟁 상품 비교표', '가격/혜택 갭', '상품 개선 후보'],
    workflow: ['카테고리나 키워드를 선택합니다.', '상위 상품을 가격과 리뷰 기준으로 정렬합니다.', '자사 상품과 차이를 비교합니다.', '개선 액션을 리뷰 분석으로 연결합니다.'],
    alerts: ['리딩 상품 가격 변경', '경쟁 상품 리뷰 급증', '상위권 혜택 변경'],
    related: ['realtime-ranking', 'market-trend-voc', 'competitor-review-analysis'],
  },
  {
    ...commerceFeatureCards[2],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '랭킹 상승률과 리뷰·가격·상품정보 변화를 함께 봐 왜 급상승했는지 빠르게 추정합니다.',
    primaryMetric: '7일 랭킹 상승률',
    refresh: '일 1회 수집 + 급상승 알림',
    dataInputs: ['랭킹 변화', '가격 변화', '신규 리뷰 수', '평점 변화', '상품 정보 변경', '연결 캠페인', '키워드 변화'],
    screenSections: ['라이징 상품 리스트', '상승 원인 분해', '연결 캠페인', '신규 리뷰 수 추이', '벤치마크 상품'],
    outputs: ['급상승 트렌드 리포트', '라이징 상품 후보', '상승 원인 요약', '벤치마크 액션'],
    workflow: ['상승률 기준으로 상품을 정렬합니다.', '광고, 리뷰, 가격, 할인 변화를 분해합니다.', '자사 상품에 적용 가능한 요인을 표시합니다.', '요약 대시보드 액션으로 올립니다.'],
    alerts: ['급상승 상품 발생', '경쟁사 상승 지속', '자사 상품 상승 둔화'],
    related: ['realtime-ranking', 'leading-product-analysis', 'market-trend-voc'],
  },
  {
    ...commerceFeatureCards[3],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '리뷰와 가격 반응에서 반복되는 만족 요인과 구매 저항을 파악합니다.',
    primaryMetric: '리뷰 반응 비중',
    refresh: '일 1회 수집',
    dataInputs: ['리뷰 요약', '가격 변화', '평점 변화', '랭킹 변화', '프로모션 변화'],
    screenSections: ['리뷰 반응 요약', '가격/혜택 변화', '구매 사유', '불만 요인', '시장 기회 요약'],
    outputs: ['시장 반응 리포트', '리뷰 반응 인사이트', '상품/소재 메시지 후보'],
    workflow: ['카테고리와 상품을 선택합니다.', '리뷰와 가격 변화를 함께 봅니다.', '구매 사유와 구매 저항을 분리합니다.', '소재 메시지와 상품 개선안으로 전환합니다.'],
    alerts: ['신규 리뷰 반응 증가', '불만 요인 상승', '관심 상품 반응 변화'],
    related: ['owned-review-analysis', 'competitor-review-analysis', 'keyword-reference'],
  },
  {
    ...commerceFeatureCards[4],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '자사 상품 리뷰를 분석해 구매 사유, 만족 요인, 불만 요인을 제품과 광고 액션으로 연결합니다.',
    primaryMetric: '만족 표현 비중',
    refresh: '일 1회 수집',
    dataInputs: ['리뷰 내용', '리뷰 이미지', '평점', '등록일', '상품 옵션', '대표 표현', '만족 요인', '불만 요인'],
    screenSections: ['리뷰 요약', '만족/불만 요약', '구매 사유', '불만 요인', '리뷰 탐색'],
    outputs: ['자사 리뷰 분석 리포트', '구매 사유 메시지', '상품 개선 이슈', '리뷰 대응 우선순위'],
    workflow: ['상품을 선택합니다.', '만족/불만 표현을 항목별로 분리합니다.', '반복되는 리뷰 표현을 소재 문구로 저장합니다.', '불만 요인을 상품 개선 액션으로 넘깁니다.'],
    alerts: ['불만 리뷰 급증', '특정 옵션 불만 증가', '구매 사유 변화'],
    related: ['market-trend-voc', 'competitor-review-analysis', 'realtime-ranking'],
  },
  {
    ...commerceFeatureCards[5],
    category: 'lagging',
    platforms: ['올리브영', '쿠팡', '네이버'],
    objective: '경쟁 상품 리뷰를 세분화해 자사와 다른 구매 이유, 불만, 차별화 기회를 찾습니다.',
    primaryMetric: '경쟁사 불만 요인',
    refresh: '일 1회 수집',
    dataInputs: ['경쟁 상품', '리뷰 내용', '평점', '리뷰수', '가격', '성분', '배송', '반복 표현'],
    screenSections: ['경쟁 상품 선택', '리뷰 반응 비교', '만족/불만 차이', '차별화 기회', '위험 신호'],
    outputs: ['경쟁사 리뷰 분석 리포트', '차별화 메시지', '상품 개선 후보', '시장 위험 신호'],
    workflow: ['경쟁 상품군을 등록합니다.', '리뷰 토픽을 자사와 비교합니다.', '경쟁사 불만과 자사 강점을 연결합니다.', '캠페인 메시지와 상품 개선 액션으로 정리합니다.'],
    alerts: ['경쟁 상품 긍정 토픽 상승', '경쟁사 불만 급증', '자사 대비 리뷰 갭 확대'],
    related: ['owned-review-analysis', 'leading-product-analysis', 'market-trend-voc'],
  },
];

export const reportTemplates = [
  '콘텐츠 트렌드 리포트',
  '키워드 리포트',
  '브랜드 리포트',
  '브랜드-콘텐츠 적합도 리포트',
  '브랜드-크리에이터 적합도 리포트',
  '캠페인 리포트',
  '랭킹 현황 리포트',
  '상품 심층 분석 리포트',
  '급상승 트렌드 리포트',
];

export const roadmapItems = [
  { phase: '1단계', title: '미디어/커머스 데이터 수집 자동화 연동 및 분석 대시보드 구현', status: '진행 중' },
  { phase: '2단계', title: 'AI 에이전트 기반 액션 제안과 보고서 자동화', status: '다음 단계' },
  { phase: '초기 채널', title: '네이버, 올리브영, 인스타그램, 유튜브', status: '우선 연결' },
  { phase: '확장 채널', title: '틱톡, X, 쿠팡, 무신사, 해외 커머스', status: '확장 후보' },
];
