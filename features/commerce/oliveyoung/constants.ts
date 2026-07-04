import type {
  AccuracyGrade,
  DataAvailability,
  MetricDomain,
  OliveYoungMetricDefinition,
  SourceType,
} from './types';

type MetricSeed = Omit<OliveYoungMetricDefinition, 'platform' | 'descriptionKo'> & {
  descriptionKo?: string;
};

const metric = (seed: MetricSeed): OliveYoungMetricDefinition => ({
  platform: 'OLIVE_YOUNG',
  descriptionKo: seed.descriptionKo ?? `${seed.nameKo}의 관측 가능 여부와 신뢰도 기준입니다.`,
  ...seed,
});

const rankingMetric = (
  id: string,
  nameKo: string,
  isPrimaryKpi = false,
  showInSummary = false
) =>
  metric({
    id,
    domain: 'RANKING',
    nameKo,
    availability: 'PUBLIC_SNAPSHOT',
    accuracyGrade: 'A',
    sourceType: 'public_page',
    isPrimaryKpi,
    showInSummary,
  });

const cardMetric = (
  id: string,
  nameKo: string,
  availability: DataAvailability,
  accuracyGrade: AccuracyGrade,
  sourceType: SourceType,
  isPrimaryKpi: boolean,
  showInSummary: boolean
) =>
  metric({
    id,
    domain: 'RANKING_PRODUCT_CARD',
    nameKo,
    availability,
    accuracyGrade,
    sourceType,
    isPrimaryKpi,
    showInSummary,
  });

const pdpMetric = (
  id: string,
  nameKo: string,
  availability: DataAvailability,
  accuracyGrade: AccuracyGrade,
  sourceType: SourceType,
  isPrimaryKpi: boolean,
  showInSummary: boolean,
  extra?: Partial<OliveYoungMetricDefinition>
) =>
  metric({
    id,
    domain: 'PDP',
    nameKo,
    availability,
    accuracyGrade,
    sourceType,
    isPrimaryKpi,
    showInSummary,
    ...extra,
  });

const reviewMetric = (
  id: string,
  nameKo: string,
  accuracyGrade: AccuracyGrade,
  extra?: Partial<OliveYoungMetricDefinition>
) =>
  metric({
    id,
    domain: 'REVIEW',
    nameKo,
    availability: 'PUBLIC_SNAPSHOT',
    accuracyGrade,
    sourceType: 'public_page',
    isPrimaryKpi: false,
    showInSummary: false,
    ...extra,
  });

const restrictedMetric = (id: string, nameKo: string) =>
  metric({
    id,
    domain: 'DERIVED_EFFECT',
    nameKo,
    availability: 'PARTNER_ONLY',
    accuracyGrade: 'X',
    sourceType: 'partner_data',
    isPrimaryKpi: false,
    showInSummary: false,
    hiddenByDefault: true,
    descriptionKo: '올리브영 파트너/제휴 데이터 또는 광고주 제공 데이터가 없으면 표시하지 않습니다.',
  });

const unsupportedMetric = (id: string, nameKo: string) =>
  metric({
    id,
    domain: 'DERIVED_EFFECT',
    nameKo,
    availability: 'UNSUPPORTED',
    accuracyGrade: 'X',
    sourceType: 'unsupported',
    isPrimaryKpi: false,
    showInSummary: false,
    hiddenByDefault: true,
    descriptionKo: '공개 화면 스냅샷과 수동 업로드만으로는 제공하지 않습니다.',
  });

export const OLIVE_YOUNG_METRIC_CATALOG: OliveYoungMetricDefinition[] = [
  rankingMetric('overall_rank', '전체 랭킹', true, true),
  rankingMetric('skincare_rank', '스킨케어 랭킹', true, true),
  rankingMetric('maskpack_rank', '마스크팩 랭킹'),
  rankingMetric('cleansing_rank', '클렌징 랭킹'),
  rankingMetric('suncare_rank', '선케어 랭킹', true, true),
  rankingMetric('makeup_rank', '메이크업 랭킹'),
  rankingMetric('nail_rank', '네일 랭킹'),
  rankingMetric('beauty_tools_rank', '뷰티소품 랭킹'),
  rankingMetric('dermo_cosmetic_rank', '더모 코스메틱 랭킹', true, true),
  rankingMetric('mens_edit_rank', '맨즈에딧 랭킹'),
  rankingMetric('fragrance_diffuser_rank', '향수/디퓨저 랭킹'),
  rankingMetric('haircare_rank', '헤어케어 랭킹'),
  rankingMetric('bodycare_rank', '바디케어 랭킹'),
  rankingMetric('health_food_rank', '건강식품 랭킹'),
  rankingMetric('food_rank', '푸드 랭킹'),
  rankingMetric('oral_care_rank', '구강용품 랭킹'),
  rankingMetric('health_goods_rank', '헬스/건강용품 랭킹'),
  rankingMetric('hygiene_rank', '위생용품 랭킹'),
  rankingMetric('fashion_rank', '패션 랭킹'),
  rankingMetric('home_living_appliance_rank', '홈리빙/가전 랭킹'),
  rankingMetric('hobby_fancy_rank', '취미/팬시 랭킹'),

  cardMetric('ranking_brand_name', '랭킹 카드 브랜드명', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false),
  cardMetric('ranking_product_name', '랭킹 카드 상품명', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  cardMetric('ranking_product_url', '랭킹 카드 상품 URL', 'PUBLIC_SNAPSHOT', 'A', 'public_page', false, false),
  cardMetric('ranking_product_image', '랭킹 카드 상품 이미지', 'PUBLIC_SNAPSHOT', 'A', 'public_page', false, false),
  cardMetric('ranking_normal_price', '랭킹 카드 정상가', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  cardMetric('ranking_sale_price', '랭킹 카드 할인가', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  cardMetric('ranking_discount_rate', '랭킹 카드 할인율', 'DERIVED', 'C', 'computed', true, true),
  cardMetric('ranking_review_count', '랭킹 카드 리뷰 수', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  cardMetric('ranking_rating', '랭킹 카드 평점', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  cardMetric('ranking_has_today_dream', '오늘드림 여부', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  cardMetric('ranking_has_gift', '증정 여부', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  cardMetric('ranking_has_coupon', '쿠폰 여부', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),

  metric({ id: 'brand_rank', domain: 'BRAND_RANKING', nameKo: '브랜드 랭킹', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'B', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),
  metric({ id: 'brand_name', domain: 'BRAND_RANKING', nameKo: '브랜드명', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'A', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),
  metric({ id: 'brand_image', domain: 'BRAND_RANKING', nameKo: '브랜드 이미지', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'B', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),
  metric({ id: 'brand_like_count', domain: 'BRAND_RANKING', nameKo: '브랜드 좋아요 수', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'B', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),

  pdpMetric('pdp_current_viewers', '현재 보고 있어요', 'PUBLIC_SNAPSHOT', 'D', 'public_page', false, false, {
    hiddenByDefault: true,
    tooltipKo: '실시간성 강한 보조 신호입니다. 광고 효용 판단의 핵심 지표로 사용하지 않습니다.',
  }),
  pdpMetric('pdp_brand_name', 'PDP 브랜드명', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  pdpMetric('pdp_product_name', 'PDP 상품명', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  pdpMetric('pdp_product_url', 'PDP 상품 URL', 'PUBLIC_SNAPSHOT', 'A', 'public_page', false, false),
  pdpMetric('pdp_product_image', 'PDP 상품 이미지', 'PUBLIC_SNAPSHOT', 'A', 'public_page', false, false),
  pdpMetric('pdp_options', '상품 옵션', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false),
  pdpMetric('pdp_normal_price', 'PDP 정상가', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  pdpMetric('pdp_sale_price', 'PDP 할인가', 'PUBLIC_SNAPSHOT', 'A', 'public_page', true, true),
  pdpMetric('pdp_discount_rate', 'PDP 할인율', 'DERIVED', 'C', 'computed', true, true),
  pdpMetric('pdp_delivery_fee', '배송비', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false),
  pdpMetric('pdp_average_delivery_days', '평균 배송일', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false),
  pdpMetric('pdp_shipping_gift', '일반배송 증정품', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  pdpMetric('pdp_shipping_gift_image', '일반배송 증정품 이미지', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false),
  pdpMetric('pdp_review_count', 'PDP 리뷰 수', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  pdpMetric('pdp_rating', 'PDP 평점', 'PUBLIC_SNAPSHOT', 'B', 'public_page', true, true),
  pdpMetric('pdp_ingredient_info', '성분 정보', 'PUBLIC_SNAPSHOT', 'B', 'public_page', false, false, {
    tooltipKo: '상품 상세에 등록된 정보 기준입니다. 제품 리뉴얼, 옵션, 협력사 등록 정보 변경에 따라 달라질 수 있습니다.',
  }),

  reviewMetric('review_created_at', '리뷰 등록일', 'B'),
  reviewMetric('review_author_masked', '리뷰 작성자', 'D', { hiddenByDefault: true, isSensitive: true }),
  reviewMetric('review_type', '리뷰 구분', 'B'),
  reviewMetric('review_option', '리뷰 옵션', 'B'),
  reviewMetric('review_like_count', '리뷰 추천 수', 'B'),
  reviewMetric('review_skin_type', '리뷰 피부 타입', 'C', {
    tooltipKo: '사용자가 명시한 경우와 AI 추정값을 반드시 구분해야 합니다.',
  }),
  reviewMetric('review_text', '리뷰 본문', 'B', {
    tooltipKo: '원문 전체 노출보다 리뷰 반응 요약과 대표 표현 중심으로 표시합니다.',
  }),
  reviewMetric('review_media', '리뷰 이미지/동영상', 'B', { hiddenByDefault: true, isSensitive: true }),

  metric({ id: 'qna_count', domain: 'QNA', nameKo: 'Q&A 수', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'B', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),
  metric({ id: 'qna_created_at', domain: 'QNA', nameKo: 'Q&A 등록일', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'B', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),
  metric({ id: 'qna_text', domain: 'QNA', nameKo: 'Q&A 본문', availability: 'PUBLIC_SNAPSHOT', accuracyGrade: 'C', sourceType: 'public_page', isPrimaryKpi: false, showInSummary: false }),

  restrictedMetric('exact_sales_volume', '정확한 판매량'),
  restrictedMetric('exact_revenue', '정확한 매출'),
  restrictedMetric('conversion_rate', '전환율'),
  restrictedMetric('order_count', '주문 수'),
  unsupportedMetric('exact_stock_quantity', '정확한 재고 수량'),
];

export const METRIC_DOMAIN_LABELS: Record<MetricDomain, string> = {
  RANKING: '랭킹',
  RANKING_PRODUCT_CARD: '랭킹 카드',
  BRAND_RANKING: '브랜드 랭킹',
  PDP: '상품 상세',
  REVIEW: '리뷰',
  QNA: 'Q&A',
  DERIVED_EFFECT: '제한/파생',
};

export const RESTRICTED_METRIC_IDS = ['exact_sales_volume', 'exact_revenue', 'conversion_rate', 'order_count'];
