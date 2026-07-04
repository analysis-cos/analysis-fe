import type { FeaturePageId } from './brandDashPlan';

export type CommerceChartFormat = 'rank' | 'count' | 'percent' | 'score' | 'price';

export interface CommerceChartSeries {
  key: string;
  label: string;
  color: string;
  format: CommerceChartFormat;
}

export interface CommerceFeaturePageContent {
  decisionTitle: string;
  decisionSummary: string;
  decisionBullets: string[];
  kpis: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  definitions: Array<{
    title: string;
    body: string;
  }>;
  chart: {
    type: 'line' | 'bar';
    title: string;
    subtitle: string;
    xKey: string;
    yHint: string;
    rankReversed?: boolean;
    footnote: string;
    data: Array<Record<string, string | number>>;
    series: CommerceChartSeries[];
  };
  drilldowns: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
  table: {
    title: string;
    description: string;
    headers: string[];
    rows: string[][];
  };
  actions: string[];
}

export const commerceFeaturePageContent: Partial<Record<FeaturePageId, CommerceFeaturePageContent>> = {
  'realtime-ranking': {
    decisionTitle: '랭킹이 실제로 움직인 채널을 먼저 찾습니다.',
    decisionSummary: '올리브영 선케어 랭킹은 42위에서 18위로 개선됐고, 쿠팡과 네이버는 같은 기간 변화가 작습니다. 광고 이후 관찰된 커머스 연관 신호는 올리브영 쪽이 가장 선명합니다.',
    decisionBullets: [
      '랭킹은 숫자가 낮을수록 좋은 지표입니다.',
      '할인, 증정, 쿠폰이 같이 켜진 구간은 별도 표시합니다.',
      '정확한 판매량이나 매출이 아니라 공개 랭킹 변화 기준으로 해석합니다.',
    ],
    kpis: [
      { label: '현재 최고 순위', value: '올리브영 18위', helper: '선케어 카테고리' },
      { label: '7일 랭킹 변화', value: '24위 상승', helper: '42위 → 18위' },
      { label: '급변 상품', value: '5개', helper: '등록 상품 기준' },
      { label: '혼선 요인', value: '프로모션 2건', helper: '할인/증정 동반' },
    ],
    definitions: [
      { title: '랭킹 변화', body: '같은 플랫폼과 카테고리 안에서 순위가 얼마나 좋아졌는지 봅니다. 42위에서 18위는 24위 상승입니다.' },
      { title: '급변 상품', body: '짧은 기간에 순위가 크게 움직인 상품입니다. 광고 외 가격, 품절, 증정 요인을 함께 확인합니다.' },
    ],
    chart: {
      type: 'line',
      title: '채널별 랭킹 추이',
      subtitle: '낮을수록 좋은 값입니다. 광고 집행일 이후 같은 방향으로 움직였는지 봅니다.',
      xKey: 'date',
      yHint: '순위',
      rankReversed: true,
      footnote: '랭킹만으로 구매를 단정하지 않습니다. 쿠폰, 증정, 품절 같은 외부 요인을 함께 봅니다.',
      data: [
        { date: 'D-3', oliveyoung: 42, coupang: 36, naver: 28 },
        { date: 'D-2', oliveyoung: 40, coupang: 35, naver: 27 },
        { date: 'D-1', oliveyoung: 39, coupang: 34, naver: 28 },
        { date: 'D+1', oliveyoung: 31, coupang: 33, naver: 26 },
        { date: 'D+3', oliveyoung: 24, coupang: 31, naver: 25 },
        { date: 'D+5', oliveyoung: 20, coupang: 30, naver: 24 },
        { date: 'D+7', oliveyoung: 18, coupang: 29, naver: 24 },
      ],
      series: [
        { key: 'oliveyoung', label: '올리브영', color: '#2a4519', format: 'rank' },
        { key: 'coupang', label: '쿠팡', color: '#60a5fa', format: 'rank' },
        { key: 'naver', label: '네이버', color: '#a855f7', format: 'rank' },
      ],
    },
    drilldowns: [
      {
        title: '랭킹 보드',
        description: '등록 상품의 현재 순위와 7일 변화를 한 화면에서 봅니다.',
        items: ['플랫폼별 현재 순위', '카테고리별 순위', '7일 상승/하락폭', '광고 집행일 마커'],
      },
      {
        title: '해석 주의',
        description: '광고 외 요인이 있는 구간을 분리합니다.',
        items: ['할인율 변경', '증정/쿠폰 시작', '오늘드림 노출', '품절/재입고'],
      },
    ],
    table: {
      title: '추적 상품 예시',
      description: '랭킹이 움직인 상품을 최신순으로 보여줍니다.',
      headers: ['상품', '플랫폼', '이전', '현재', '변화', '주의 요인'],
      rows: [
        ['라운드랩 선크림', '올리브영', '42위', '18위', '24위 상승', '증정 없음'],
        ['달바 미스트 세럼', '올리브영', '31위', '22위', '9위 상승', '쿠폰 동반'],
        ['메디힐 패드', '쿠팡', '19위', '25위', '6위 하락', '가격 상승'],
      ],
    },
    actions: ['24위 이상 상승한 상품을 라이징 상품 탐지로 보냅니다.', '프로모션 동반 상품은 광고 단독 신호에서 제외합니다.', '순위 하락 상품은 가격/품절 여부를 먼저 확인합니다.'],
  },
  'leading-product-analysis': {
    decisionTitle: '상위권 상품이 공통으로 가진 조건을 비교합니다.',
    decisionSummary: '상위 20개 상품은 오늘드림, 20% 이상 할인, 리뷰 1만 개 이상이 자주 겹칩니다. 자사 상품은 리뷰 수는 충분하지만 가격 혜택과 증정 구성이 약합니다.',
    decisionBullets: [
      '리뷰 수는 누적 신뢰도, 신규 리뷰는 최근 반응으로 분리해 봅니다.',
      '가격이 낮은 상품보다 혜택 구조가 선명한 상품이 상위권에 많이 남아 있습니다.',
      '성분/배송/증정은 상품 상세 비교에서 따로 확인합니다.',
    ],
    kpis: [
      { label: '상위권 공통 조건', value: '오늘드림 + 할인', helper: '상위 20개 중 16개' },
      { label: '자사 가격 갭', value: '+3,400원', helper: '상위 평균 대비' },
      { label: '리뷰 누적 갭', value: '-2,180개', helper: '상위 평균 대비' },
      { label: '혜택 갭', value: '증정 약함', helper: '기획세트 없음' },
    ],
    definitions: [
      { title: '리딩 상품', body: '카테고리 상위권에서 오래 유지되는 상품입니다. 단기 급등보다 반복 구매 조건을 보는 데 적합합니다.' },
      { title: '상품 조건 갭', body: '자사 상품과 상위권 평균의 가격, 리뷰, 혜택, 배송 차이를 비교한 값입니다.' },
    ],
    chart: {
      type: 'bar',
      title: '상위 상품 조건 점수',
      subtitle: '각 상품 조건을 100점 기준으로 맞춰 비교합니다.',
      xKey: 'name',
      yHint: '점수',
      footnote: '점수는 화면 비교용 목업입니다. 실제 판매량이나 매출 지표가 아닙니다.',
      data: [
        { name: '상위 평균', price: 82, review: 88, benefit: 91 },
        { name: '자사 상품', price: 68, review: 73, benefit: 52 },
        { name: '경쟁 A', price: 78, review: 84, benefit: 86 },
        { name: '경쟁 B', price: 74, review: 91, benefit: 78 },
      ],
      series: [
        { key: 'price', label: '가격 경쟁력', color: '#2a4519', format: 'score' },
        { key: 'review', label: '리뷰 신뢰도', color: '#60a5fa', format: 'score' },
        { key: 'benefit', label: '혜택 선명도', color: '#a855f7', format: 'score' },
      ],
    },
    drilldowns: [
      {
        title: '상품 비교',
        description: '상위권 상품의 가격, 혜택, 배송, 리뷰를 같은 기준으로 비교합니다.',
        items: ['정상가/할인가', '할인율', '오늘드림', '증정/쿠폰', '리뷰 누적 수'],
      },
      {
        title: '자사 대비 갭',
        description: '자사 상품이 바로 개선할 수 있는 조건을 분리합니다.',
        items: ['가격 갭', '리뷰 갭', '혜택 갭', '상세 페이지 정보 갭'],
      },
    ],
    table: {
      title: '상위 상품 비교 예시',
      description: '가격과 리뷰만 섞어 보지 않고 혜택 구조까지 같이 봅니다.',
      headers: ['상품', '가격', '리뷰 누적', '평점', '혜택', '판단'],
      rows: [
        ['경쟁 A 선크림', '21,900원', '18,420', '4.8', '오늘드림/증정', '상위 유지 조건 선명'],
        ['자사 선크림', '25,300원', '16,240', '4.7', '오늘드림', '혜택 보강 필요'],
        ['경쟁 B 선세럼', '19,800원', '12,880', '4.6', '쿠폰/1+1', '가격 소구 강함'],
      ],
    },
    actions: ['자사 상품의 혜택 갭을 프로모션 검토로 넘깁니다.', '리뷰 누적은 충분하지만 신규 반응이 낮은 상품은 리뷰 분석으로 넘깁니다.', '상위권 공통 메시지는 다음 광고 소재 후보로 저장합니다.'],
  },
  'rising-product-detection': {
    decisionTitle: '급상승 이유를 광고, 가격, 리뷰, 재고로 나눠 봅니다.',
    decisionSummary: '라이징 후보 7개 중 3개는 광고 집행일과 랭킹 상승 시점이 가깝습니다. 다만 4개는 쿠폰 또는 증정이 같이 발생해 복합 요인으로 해석해야 합니다.',
    decisionBullets: [
      '급상승은 결과이고, 원인은 광고/가격/리뷰/재고로 분해합니다.',
      '신규 리뷰 수는 최근 관심의 양입니다. 리뷰 내용의 방향은 별도 리뷰 반응에서 확인합니다.',
      '프로모션 동반 상품은 광고 단독 신호로 보지 않습니다.',
    ],
    kpis: [
      { label: '라이징 후보', value: '7개', helper: '7일 기준' },
      { label: '광고 연결 신호', value: '3개', helper: '집행 후 D+3 내 상승' },
      { label: '프로모션 동반', value: '4개', helper: '할인/증정/쿠폰' },
      { label: '검토 우선', value: '2개', helper: '상승 + 혼선 적음' },
    ],
    definitions: [
      { title: '라이징 상품', body: '짧은 기간에 랭킹이 빠르게 오른 상품입니다. 상승 원인을 바로 단정하지 않고 요인별로 나눕니다.' },
      { title: '원인 분해', body: '광고 집행, 가격 변화, 신규 리뷰 수, 품절/재입고, 증정/쿠폰을 각각 확인합니다.' },
    ],
    chart: {
      type: 'bar',
      title: '상승 원인 분해',
      subtitle: '100점 기준으로 어떤 요인이 더 크게 겹쳤는지 표시합니다.',
      xKey: 'factor',
      yHint: '관찰 강도',
      footnote: '원인 분해는 관찰된 신호의 강도입니다. 광고 단독 효과를 확정하지 않습니다.',
      data: [
        { factor: '광고 연결', medihill: 72, competitor: 38 },
        { factor: '가격 혜택', medihill: 18, competitor: 74 },
        { factor: '신규 리뷰 수', medihill: 66, competitor: 54 },
        { factor: '재고/배송', medihill: 24, competitor: 46 },
      ],
      series: [
        { key: 'medihill', label: '자사 후보', color: '#2a4519', format: 'score' },
        { key: 'competitor', label: '경쟁 후보', color: '#60a5fa', format: 'score' },
      ],
    },
    drilldowns: [
      {
        title: '라이징 리스트',
        description: '상승률과 혼선 요인을 함께 보여줍니다.',
        items: ['7일 랭킹 상승폭', '신규 리뷰 수', '가격/혜택 변화', '광고 연결 여부'],
      },
      {
        title: '상승 원인',
        description: '상승을 만든 가능성이 큰 요인을 분리합니다.',
        items: ['광고 연결', '프로모션 강화', '신규 리뷰 수', '재고 회복'],
      },
    ],
    table: {
      title: '라이징 후보 예시',
      description: '상승폭만 보지 않고 혼선 요인까지 같이 봅니다.',
      headers: ['상품', '상승폭', '신규 리뷰', '프로모션', '광고 연결', '판단'],
      rows: [
        ['자사 선크림', '24위 상승', '+312', '없음', '있음', '우선 검토'],
        ['경쟁 세럼', '31위 상승', '+186', '쿠폰/증정', '없음', '프로모션 영향 큼'],
        ['경쟁 패드', '18위 상승', '+92', '할인', '있음', '복합 요인'],
      ],
    },
    actions: ['혼선이 적은 급상승 상품을 요약 대시보드에 올립니다.', '프로모션 동반 상승은 별도 태그를 붙입니다.', '신규 리뷰가 늘었지만 평점이 하락한 상품은 리뷰 리스크로 보냅니다.'],
  },
  'market-trend-voc': {
    decisionTitle: '리뷰의 양과 내용의 방향을 분리해서 봅니다.',
    decisionSummary: '신규 리뷰 수는 D+7에 312개 늘었지만, 리뷰 반응은 만족 표현 64%, 불만 표현 14%로 안정적입니다. 즉 “많이 늘었다”와 “좋게 반응했다”를 별도 지표로 판단합니다.',
    decisionBullets: [
      '신규 리뷰 수: 기간 내 새로 추가된 리뷰 개수입니다.',
      '리뷰 반응: 신규 리뷰 안에서 만족/불만/구매 이유 표현이 차지하는 비중입니다.',
      '신규 리뷰 수가 커도 불만 표현 비중이 오르면 광고 메시지나 제품 경험을 점검해야 합니다.',
    ],
    kpis: [
      { label: '신규 리뷰 수', value: '+312개', helper: 'D+7 기준, 반응의 양' },
      { label: '만족 표현 비중', value: '64%', helper: '신규 리뷰 중 비중' },
      { label: '불만 표현 비중', value: '14%', helper: '향/눈시림 중심' },
      { label: '구매 이유 1위', value: '산뜻함', helper: '광고 메시지와 일부 일치' },
    ],
    definitions: [
      { title: '신규 리뷰 수', body: '새로 쌓인 리뷰 개수입니다. 관심과 구매 이후 반응의 양을 보여주지만, 좋고 나쁨은 말해주지 않습니다.' },
      { title: '리뷰 반응', body: '신규 리뷰에서 만족, 불만, 구매 이유 표현이 얼마나 반복되는지 보는 지표입니다. 내용의 방향을 보여줍니다.' },
    ],
    chart: {
      type: 'line',
      title: '리뷰 반응 비중 추이',
      subtitle: '리뷰 개수가 아니라 신규 리뷰 안에서 어떤 표현이 늘었는지 봅니다.',
      xKey: 'date',
      yHint: '비중',
      footnote: '신규 리뷰 수는 KPI로 따로 표시합니다. 이 그래프는 리뷰 내용의 방향만 보여줍니다.',
      data: [
        { date: 'D-3', satisfaction: 52, complaint: 18, purchaseReason: 34 },
        { date: 'D-2', satisfaction: 53, complaint: 17, purchaseReason: 35 },
        { date: 'D-1', satisfaction: 55, complaint: 16, purchaseReason: 36 },
        { date: 'D+1', satisfaction: 59, complaint: 15, purchaseReason: 41 },
        { date: 'D+3', satisfaction: 62, complaint: 14, purchaseReason: 44 },
        { date: 'D+5', satisfaction: 63, complaint: 14, purchaseReason: 46 },
        { date: 'D+7', satisfaction: 64, complaint: 14, purchaseReason: 47 },
      ],
      series: [
        { key: 'satisfaction', label: '만족 표현', color: '#2a4519', format: 'percent' },
        { key: 'complaint', label: '불만 표현', color: '#f97316', format: 'percent' },
        { key: 'purchaseReason', label: '구매 이유 표현', color: '#60a5fa', format: 'percent' },
      ],
    },
    drilldowns: [
      {
        title: '시장 반응 요약',
        description: '리뷰 양과 리뷰 내용의 방향을 분리합니다.',
        items: ['신규 리뷰 수', '만족 표현 비중', '불만 표현 비중', '구매 이유 TOP 3'],
      },
      {
        title: '메시지 연결',
        description: '광고에서 말한 소구가 실제 리뷰 표현과 이어지는지 확인합니다.',
        items: ['산뜻함', '진정', '끈적임 없음', '눈시림 주의'],
      },
    ],
    table: {
      title: '리뷰 반응 예시',
      description: '리뷰 원문 대신 짧은 대표 표현과 비중만 보여줍니다.',
      headers: ['구분', '대표 표현', '비중', '변화', '해석'],
      rows: [
        ['만족', '산뜻함', '28%', '+7%p', '광고 소구와 일치'],
        ['만족', '진정감', '21%', '+4%p', '제품 강점 유지'],
        ['불만', '눈시림', '8%', '+2%p', '주의 필요'],
      ],
    },
    actions: ['신규 리뷰 수와 리뷰 반응을 같은 그래프에 섞지 않습니다.', '만족 표현은 소재 메시지 후보로 저장합니다.', '불만 표현은 제품/상세페이지 점검 항목으로 보냅니다.'],
  },
  'owned-review-analysis': {
    decisionTitle: '자사 리뷰에서 바로 고칠 문제와 계속 밀 메시지를 분리합니다.',
    decisionSummary: '리뷰 수는 증가했고 만족 표현 비중도 유지되고 있습니다. 다만 향과 눈시림 불만이 D+7에 같이 올라와 제품 경험 리스크를 따로 관리해야 합니다.',
    decisionBullets: [
      '신규 리뷰 수는 최근 반응의 양입니다.',
      '만족/불만 비중은 신규 리뷰 내용의 방향입니다.',
      '작성자나 리뷰 이미지는 기본 화면에 노출하지 않습니다.',
    ],
    kpis: [
      { label: '신규 리뷰 수', value: '+218개', helper: '최근 7일' },
      { label: '만족 표현 비중', value: '68%', helper: '산뜻함/진정 중심' },
      { label: '불만 표현 비중', value: '12%', helper: '향/눈시림 중심' },
      { label: '조치 필요', value: '3건', helper: '상세페이지/소재 수정' },
    ],
    definitions: [
      { title: '신규 리뷰 수', body: '기간 동안 새로 늘어난 리뷰 개수입니다. 많이 늘었다는 사실만 보여줍니다.' },
      { title: '만족/불만 비중', body: '신규 리뷰 안에서 만족 표현과 불만 표현이 얼마나 반복되는지 보여줍니다. 리뷰의 방향입니다.' },
    ],
    chart: {
      type: 'line',
      title: '자사 리뷰 반응 추이',
      subtitle: '만족 표현과 불만 표현의 비중을 분리해 봅니다.',
      xKey: 'date',
      yHint: '비중',
      footnote: '리뷰 수 증가는 KPI로 따로 보고, 이 그래프는 리뷰 내용의 방향을 봅니다.',
      data: [
        { date: 'D-3', satisfaction: 63, complaint: 9, reason: 38 },
        { date: 'D-2', satisfaction: 64, complaint: 9, reason: 39 },
        { date: 'D-1', satisfaction: 65, complaint: 10, reason: 41 },
        { date: 'D+1', satisfaction: 68, complaint: 11, reason: 43 },
        { date: 'D+3', satisfaction: 69, complaint: 12, reason: 46 },
        { date: 'D+5', satisfaction: 68, complaint: 12, reason: 48 },
        { date: 'D+7', satisfaction: 68, complaint: 12, reason: 49 },
      ],
      series: [
        { key: 'satisfaction', label: '만족 표현', color: '#2a4519', format: 'percent' },
        { key: 'complaint', label: '불만 표현', color: '#f97316', format: 'percent' },
        { key: 'reason', label: '구매 이유 표현', color: '#60a5fa', format: 'percent' },
      ],
    },
    drilldowns: [
      {
        title: '구매 사유',
        description: '광고 소재로 다시 쓸 수 있는 표현을 모읍니다.',
        items: ['산뜻함', '진정감', '끈적임 없음', '민감 피부 사용'],
      },
      {
        title: '불만 요인',
        description: '상세페이지나 제품 사용 안내에서 줄여야 할 리스크를 봅니다.',
        items: ['향', '눈시림', '밀림', '가격 부담'],
      },
    ],
    table: {
      title: '자사 리뷰 액션 큐',
      description: '리뷰 표현을 제품/소재/상세페이지 액션으로 연결합니다.',
      headers: ['리뷰 반응', '대표 표현', '변화', '우선순위', '다음 액션'],
      rows: [
        ['만족', '산뜻하고 안 끈적임', '+9%p', '상', '소재 메시지 유지'],
        ['불만', '눈이 시림', '+2%p', '상', '사용 부위 안내 보강'],
        ['불만', '향이 강함', '+3%p', '중', '상세페이지 표현 점검'],
      ],
    },
    actions: ['만족 표현은 다음 광고 소재 문구 후보로 저장합니다.', '불만 표현이 늘어난 항목은 상세페이지 수정 큐로 보냅니다.', '리뷰 수만 늘고 만족 비중이 떨어지면 리스크 알림을 띄웁니다.'],
  },
  'competitor-review-analysis': {
    decisionTitle: '경쟁사가 못 채우는 불만을 자사 메시지로 바꿉니다.',
    decisionSummary: '경쟁 상품은 가격 혜택은 강하지만 향, 자극, 밀림 불만이 반복됩니다. 자사 상품은 진정감과 산뜻함에서 우위가 있어 다음 소재 메시지로 활용할 수 있습니다.',
    decisionBullets: [
      '경쟁사 리뷰는 자사와 같은 기준으로 만족/불만을 비교합니다.',
      '리뷰 수 자체보다 반복되는 불만이 차별화 기회입니다.',
      '경쟁사 매출이나 판매량은 표시하지 않습니다.',
    ],
    kpis: [
      { label: '비교 상품', value: '8개', helper: '동일 카테고리' },
      { label: '경쟁 불만 1위', value: '향', helper: '경쟁 리뷰 22%' },
      { label: '자사 강점 1위', value: '진정감', helper: '자사 리뷰 31%' },
      { label: '차별화 메시지', value: '4개', helper: '소재 후보' },
    ],
    definitions: [
      { title: '경쟁 불만 요인', body: '경쟁 상품 리뷰에서 반복되는 불만 표현입니다. 자사 메시지의 기회가 될 수 있습니다.' },
      { title: '자사 우위 표현', body: '자사 리뷰에서 반복되지만 경쟁사에는 약한 만족 표현입니다. 광고 소재 후보로 저장합니다.' },
    ],
    chart: {
      type: 'bar',
      title: '자사 vs 경쟁 리뷰 반응',
      subtitle: '같은 항목을 비중으로 맞춰 비교합니다.',
      xKey: 'topic',
      yHint: '비중',
      footnote: '경쟁사 판매량이나 매출이 아니라 공개 리뷰 표현의 반복 비중입니다.',
      data: [
        { topic: '진정감', owned: 31, competitor: 18 },
        { topic: '산뜻함', owned: 28, competitor: 21 },
        { topic: '향 불만', owned: 9, competitor: 22 },
        { topic: '눈시림', owned: 8, competitor: 17 },
      ],
      series: [
        { key: 'owned', label: '자사', color: '#2a4519', format: 'percent' },
        { key: 'competitor', label: '경쟁', color: '#f97316', format: 'percent' },
      ],
    },
    drilldowns: [
      {
        title: '차별화 기회',
        description: '경쟁 불만과 자사 강점을 연결합니다.',
        items: ['무향/저자극 소구', '산뜻한 마무리', '민감 피부 사용감', '눈시림 안내'],
      },
      {
        title: '위험 신호',
        description: '경쟁사가 강한 영역과 자사가 약한 영역을 분리합니다.',
        items: ['가격 혜택', '증정 구성', '리뷰 누적 수', '배송 편의성'],
      },
    ],
    table: {
      title: '경쟁 비교 예시',
      description: '자사 메시지로 전환할 수 있는 차이를 정리합니다.',
      headers: ['항목', '자사', '경쟁', '차이', '활용'],
      rows: [
        ['진정감', '31%', '18%', '+13%p', '핵심 소재 메시지'],
        ['향 불만', '9%', '22%', '-13%p', '무향/저자극 강조'],
        ['가격 혜택', '52점', '78점', '-26점', '프로모션 검토'],
      ],
    },
    actions: ['경쟁 불만이 큰 항목을 자사 소재 메시지로 전환합니다.', '경쟁 우위가 가격이면 프로모션 혼선 요인으로 표시합니다.', '자사도 같은 불만이 오르면 제품 리스크 알림을 띄웁니다.'],
  },
};
