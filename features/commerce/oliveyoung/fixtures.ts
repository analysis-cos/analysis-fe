import { OLIVE_YOUNG_METRIC_CATALOG } from './constants';
import type {
  ConfounderType,
  OliveYoungAnalysisViewModel,
  OliveYoungDataSourceStatus,
  OliveYoungDerivedEffect,
  OliveYoungProductSnapshot,
  OliveYoungReviewVocSummary,
  OliveYoungScenarioId,
  OliveYoungTimelinePoint,
} from './types';

const observedAt = '2026-07-04T10:00:00+09:00';
const collectedAt = '2026-07-04T10:08:00+09:00';

function buildStatus(
  reliabilityLevel: OliveYoungDataSourceStatus['reliabilityLevel'],
  warnings: string[],
  limitations: string[],
  dataQualityReasons: string[]
): OliveYoungDataSourceStatus {
  const availableMetricCount = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) =>
    ['PUBLIC_SNAPSHOT', 'DERIVED', 'MANUAL_UPLOAD'].includes(metric.availability)
  ).length;
  const restrictedMetricCount = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) =>
    ['PARTNER_ONLY', 'NOT_CONNECTED'].includes(metric.availability)
  ).length;
  const unsupportedMetricCount = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) => metric.availability === 'UNSUPPORTED').length;

  return {
    platform: 'OLIVE_YOUNG',
    reliabilityLevel,
    sourceTypes: ['public_page', 'computed', 'fixture'],
    lastObservedAt: observedAt,
    lastCollectedAt: collectedAt,
    availableMetricCount,
    restrictedMetricCount,
    unsupportedMetricCount,
    dataQualityScore: reliabilityLevel === 'HIGH' ? 86 : reliabilityLevel === 'MEDIUM' ? 72 : 48,
    dataQualityReasons,
    warnings,
    limitations,
  };
}

function snapshot(seed: Partial<OliveYoungProductSnapshot> & Pick<OliveYoungProductSnapshot, 'id' | 'observedAt' | 'productName'>): OliveYoungProductSnapshot {
  return {
    sourceType: 'fixture',
    productId: 'product-suncare-01',
    platformProductId: 'oy-000001',
    goodsNo: 'A000000001',
    brandName: '라운드랩',
    productImageUrl: 'https://picsum.photos/seed/oliveyoung-suncare/96/96',
    categoryName: '선케어',
    collectedAt,
    dataQualityScore: 78,
    dataQualityReasons: ['공개 화면 스냅샷 기반 데이터입니다.', '동일 상품 옵션과 기획세트 표기 변화가 있을 수 있습니다.'],
    ...seed,
  };
}

function buildSnapshots(kind: 'strong' | 'promotion' | 'risk' | 'partial'): OliveYoungProductSnapshot[] {
  if (kind === 'partial') {
    return [
      snapshot({
        id: 'partial-current',
        observedAt,
        productName: '수동 업로드 대기 상품',
        rank: null,
        previousRank: null,
        normalPrice: null,
        salePrice: null,
        discountRate: null,
        reviewCount: 842,
        rating: null,
        badges: { hasCoupon: false, hasGift: false, hasTodayDream: true },
        dataQualityScore: 42,
        dataQualityReasons: ['랭킹 기준일 스냅샷이 없습니다.', '가격/할인 정보가 수동 업로드되지 않았습니다.'],
      }),
    ];
  }

  const common = {
    normalPrice: 28000,
    categoryName: '선케어',
    sourceUrl: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do',
  };

  if (kind === 'promotion') {
    return [
      snapshot({ id: 'promo-d7', observedAt, productName: '자작나무 수분 선크림 기획세트', previousRank: 42, rank: 18, rankDelta: -24, salePrice: 18760, discountRate: 33, reviewCount: 1534, rating: 4.7, badges: { hasCoupon: true, hasGift: true, hasTodayDream: true, hasSale: true }, ...common }),
      snapshot({ id: 'promo-d3', observedAt: '2026-07-01T10:00:00+09:00', productName: '자작나무 수분 선크림 기획세트', previousRank: 42, rank: 25, rankDelta: -17, salePrice: 18760, discountRate: 33, reviewCount: 1422, rating: 4.7, badges: { hasCoupon: true, hasGift: true, hasTodayDream: true, hasSale: true }, ...common }),
      snapshot({ id: 'promo-base', observedAt: '2026-06-27T10:00:00+09:00', productName: '자작나무 수분 선크림 기획세트', previousRank: null, rank: 42, rankDelta: null, salePrice: 22400, discountRate: 20, reviewCount: 1222, rating: 4.7, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true }, ...common }),
    ];
  }

  if (kind === 'risk') {
    return [
      snapshot({ id: 'risk-d7', observedAt, productName: '톤업 워터리 선 플루이드', previousRank: 42, rank: 39, rankDelta: -3, normalPrice: 32000, salePrice: 25600, discountRate: 20, reviewCount: 1310, rating: 4.4, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true } }),
      snapshot({ id: 'risk-base', observedAt: '2026-06-27T10:00:00+09:00', productName: '톤업 워터리 선 플루이드', previousRank: null, rank: 42, rankDelta: null, normalPrice: 32000, salePrice: 25600, discountRate: 20, reviewCount: 1092, rating: 4.8, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true } }),
    ];
  }

  return [
    snapshot({ id: 'strong-d7', observedAt, productName: '자작나무 수분 선크림', previousRank: 42, rank: 18, rankDelta: -24, salePrice: 22400, discountRate: 20, reviewCount: 1534, rating: 4.7, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true }, ...common }),
    snapshot({ id: 'strong-d3', observedAt: '2026-07-01T10:00:00+09:00', productName: '자작나무 수분 선크림', previousRank: 42, rank: 29, rankDelta: -13, salePrice: 22400, discountRate: 20, reviewCount: 1398, rating: 4.7, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true }, ...common }),
    snapshot({ id: 'strong-base', observedAt: '2026-06-27T10:00:00+09:00', productName: '자작나무 수분 선크림', previousRank: null, rank: 42, rankDelta: null, salePrice: 22400, discountRate: 20, reviewCount: 1222, rating: 4.7, badges: { hasCoupon: false, hasGift: false, hasTodayDream: true, hasSale: true }, ...common }),
  ];
}

function buildTimeline(kind: 'strong' | 'promotion' | 'risk' | 'partial'): OliveYoungTimelinePoint[] {
  if (kind === 'partial') {
    return [
      { date: '07.02', observedAt: '2026-07-02T10:00:00+09:00', reviewCount: 820, hasTodayDream: true, eventLabels: ['수동 업로드 일부'] },
      { date: '07.04', observedAt, reviewCount: 842, hasTodayDream: true, eventLabels: ['가격 데이터 없음'] },
    ];
  }

  const promo = kind === 'promotion';
  const risk = kind === 'risk';

  return [
    { date: '06.27', observedAt: '2026-06-27T10:00:00+09:00', rank: 42, reviewCount: risk ? 1092 : 1222, rating: risk ? 4.8 : 4.7, normalPrice: risk ? 32000 : 28000, salePrice: risk ? 25600 : 22400, discountRate: promo ? 20 : 20, hasTodayDream: true, eventLabels: ['기준 스냅샷'] },
    { date: '06.28', observedAt: '2026-06-28T10:00:00+09:00', rank: risk ? 43 : 39, reviewCount: risk ? 1118 : 1260, rating: risk ? 4.7 : 4.7, discountRate: promo ? 20 : 20, hasTodayDream: true, eventLabels: ['광고 시작'] },
    { date: '06.29', observedAt: '2026-06-29T10:00:00+09:00', rank: risk ? 41 : 34, reviewCount: risk ? 1154 : 1308, rating: risk ? 4.7 : 4.7, discountRate: promo ? 33 : 20, hasCoupon: promo, hasGift: promo, hasTodayDream: true, eventLabels: promo ? ['쿠폰 시작', '증정 시작'] : ['콘텐츠 업로드'] },
    { date: '06.30', observedAt: '2026-06-30T10:00:00+09:00', rank: risk ? 40 : 31, reviewCount: risk ? 1190 : 1342, rating: risk ? 4.6 : 4.7, discountRate: promo ? 33 : 20, hasCoupon: promo, hasGift: promo, hasTodayDream: true, eventLabels: [] },
    { date: '07.01', observedAt: '2026-07-01T10:00:00+09:00', rank: risk ? 39 : 25, reviewCount: risk ? 1234 : 1422, rating: risk ? 4.5 : 4.7, discountRate: promo ? 33 : 20, hasCoupon: promo, hasGift: promo, hasTodayDream: true, eventLabels: promo ? ['할인율 변경'] : [] },
    { date: '07.02', observedAt: '2026-07-02T10:00:00+09:00', rank: risk ? 40 : 22, reviewCount: risk ? 1268 : 1478, rating: risk ? 4.5 : 4.7, discountRate: promo ? 33 : 20, hasCoupon: promo, hasGift: promo, hasTodayDream: true, eventLabels: [] },
    { date: '07.04', observedAt, rank: risk ? 39 : 18, reviewCount: risk ? 1310 : 1534, rating: risk ? 4.4 : 4.7, discountRate: promo ? 33 : 20, hasCoupon: promo, hasGift: promo, hasTodayDream: true, eventLabels: ['D+7 관측'] },
  ];
}

function buildSummary(kind: 'strong' | 'promotion' | 'risk' | 'partial'): OliveYoungDerivedEffect {
  const shared = {
    productId: 'product-suncare-01',
    campaignId: 'campaign-youtube-01',
    baselineDate: '2026-06-27',
    metricDate: '2026-07-04',
    rankDeltaD1: 3,
    rankDeltaD3: 13,
    rankDeltaD7: 24,
    rankDeltaD14: null,
  };

  if (kind === 'promotion') {
    return {
      ...shared,
      reviewCountDeltaD7: 312,
      ratingDeltaD7: 0,
      priceChangeRate: -16,
      discountRateChange: 13,
      promotionChanged: true,
      confounders: ['DISCOUNT', 'COUPON', 'GIFT', 'TODAY_DREAM'],
      effectSignal: 'MEDIUM',
      confidence: 'LOW',
      reasons: ['캠페인 이후 랭킹 상승이 관찰되었습니다.', '리뷰 수 증가가 함께 관찰되었습니다.', '할인율과 프로모션 변화가 같은 기간 발생했습니다.'],
      warnings: ['할인율 증가가 함께 관찰되었습니다.', '쿠폰/증정이 동시에 진행되었습니다.', '광고 단독 효과로 해석하지 마세요.'],
    };
  }

  if (kind === 'risk') {
    return {
      ...shared,
      rankDeltaD7: 3,
      reviewCountDeltaD7: 218,
      ratingDeltaD7: -0.4,
      priceChangeRate: 0,
      discountRateChange: 0,
      promotionChanged: false,
      confounders: ['TODAY_DREAM'],
      effectSignal: 'WEAK',
      confidence: 'MEDIUM',
      reasons: ['랭킹 변화는 제한적입니다.', '리뷰 수 증가는 관찰되었습니다.', '부정적인 리뷰 반응이 함께 증가했습니다.'],
      warnings: ['새 리뷰 수 증가와 함께 부정적인 리뷰 반응 증가가 관찰되었습니다.', '눈시림, 향, 밀림 관련 사용감 리스크 확인이 필요합니다.'],
    };
  }

  if (kind === 'partial') {
    return {
      productId: 'product-suncare-01',
      campaignId: 'campaign-youtube-01',
      baselineDate: undefined,
      metricDate: '2026-07-04',
      rankDeltaD1: null,
      rankDeltaD3: null,
      rankDeltaD7: null,
      rankDeltaD14: null,
      reviewCountDeltaD7: null,
      ratingDeltaD7: null,
      priceChangeRate: null,
      discountRateChange: null,
      promotionChanged: false,
      confounders: ['UNKNOWN'],
      effectSignal: 'UNKNOWN',
      confidence: 'UNKNOWN',
      reasons: ['기준일 스냅샷이 없어 캠페인 전 대비 변화는 계산할 수 없습니다.'],
      warnings: ['일부 지표만 사용 가능합니다.'],
    };
  }

  return {
    ...shared,
    reviewCountDeltaD7: 312,
    ratingDeltaD7: 0,
    priceChangeRate: 0,
    discountRateChange: 0,
    promotionChanged: false,
    confounders: [],
    effectSignal: 'STRONG',
    confidence: 'MEDIUM',
    reasons: ['캠페인 이후 랭킹 상승이 관찰되었습니다.', '리뷰 수 증가가 함께 관찰되었습니다.', '가격/프로모션 변화가 제한적입니다.'],
    warnings: [],
  };
}

function buildReviewVoc(kind: 'strong' | 'promotion' | 'risk' | 'partial'): OliveYoungReviewVocSummary | undefined {
  if (kind === 'partial') return undefined;

  if (kind === 'risk') {
    return {
      reviewCount: 1310,
      reviewCountDelta: 218,
      rating: 4.4,
      positiveRatio: 0.54,
      negativeRatio: 0.31,
      neutralRatio: 0.15,
      positiveTopics: [
        { label: '산뜻함', count: 82, ratio: 0.18, examples: ['마무리가 가볍다는 짧은 표현이 반복됩니다.'] },
        { label: '톤업', count: 64, ratio: 0.14 },
        { label: '휴대성', count: 42, ratio: 0.09 },
      ],
      negativeTopics: [
        { label: '눈시림', count: 76, ratio: 0.17, examples: ['눈가 사용 시 불편했다는 짧은 표현이 관찰됩니다.'] },
        { label: '향', count: 58, ratio: 0.13 },
        { label: '밀림', count: 47, ratio: 0.11 },
      ],
      purchaseReasonTags: [
        { label: '가벼운 사용감', count: 80, ratio: 0.18 },
        { label: '톤 보정', count: 61, ratio: 0.14 },
        { label: '외출용', count: 38, ratio: 0.09 },
      ],
      complaintTags: [
        { label: '눈시림', count: 76, ratio: 0.17 },
        { label: '향 강함', count: 58, ratio: 0.13 },
        { label: '베이스 밀림', count: 47, ratio: 0.11 },
      ],
      dataQualityReasons: ['리뷰 원문은 요약 토픽으로만 표시합니다.', '작성자와 리뷰 미디어는 기본 화면에서 숨깁니다.'],
    };
  }

  return {
    reviewCount: 1534,
    reviewCountDelta: 312,
    rating: 4.7,
    positiveRatio: 0.72,
    negativeRatio: 0.12,
    neutralRatio: 0.16,
    positiveTopics: [
      { label: '속건조', count: 118, ratio: 0.21, examples: ['건조함이 덜하다는 짧은 표현이 반복됩니다.'] },
      { label: '산뜻함', count: 96, ratio: 0.18 },
      { label: '진정', count: 84, ratio: 0.15 },
    ],
    negativeTopics: [
      { label: '백탁', count: 34, ratio: 0.06 },
      { label: '향', count: 28, ratio: 0.05 },
      { label: '용량', count: 21, ratio: 0.04 },
    ],
    purchaseReasonTags: [
      { label: '수분감', count: 106, ratio: 0.2 },
      { label: '데일리 선케어', count: 92, ratio: 0.17 },
      { label: '민감 피부', count: 74, ratio: 0.14 },
    ],
    complaintTags: [
      { label: '백탁', count: 34, ratio: 0.06 },
      { label: '향', count: 28, ratio: 0.05 },
      { label: '가격', count: 18, ratio: 0.03 },
    ],
    dataQualityReasons: ['리뷰 반응은 공개 리뷰 표현 기반 요약입니다.', '작성자 정보와 리뷰 미디어는 노출하지 않습니다.'],
  };
}

function buildAnalysis(kind: 'strong' | 'promotion' | 'risk' | 'partial'): OliveYoungAnalysisViewModel {
  const snapshots = buildSnapshots(kind);
  const confounders: ConfounderType[] = kind === 'promotion' ? ['DISCOUNT', 'COUPON', 'GIFT'] : kind === 'risk' ? ['TODAY_DREAM'] : kind === 'partial' ? ['UNKNOWN'] : [];
  const warnings = kind === 'promotion'
    ? ['정확한 판매량, 매출, 전환율은 포함되지 않습니다.', '가격/프로모션 변화가 함께 관찰되었습니다.']
    : kind === 'risk'
      ? ['정확한 판매량, 매출, 전환율은 포함되지 않습니다.', '부정적인 리뷰 반응 증가가 관찰되었습니다.']
      : ['정확한 판매량, 매출, 전환율은 포함되지 않습니다.'];

  return {
    status: buildStatus(
      kind === 'strong' ? 'HIGH' : kind === 'partial' ? 'LOW' : 'MEDIUM',
      warnings,
      [
        '랭킹과 리뷰 변화는 광고 효용의 연관 신호이며, 광고 단독 효과를 의미하지 않습니다.',
        '올리브영 파트너/제휴 데이터 없이는 정확한 판매량, 매출, 전환율을 표시하지 않습니다.',
        ...(confounders.length ? ['할인, 쿠폰, 증정 등 해석 주의 요인을 함께 확인해야 합니다.'] : []),
      ],
      kind === 'partial'
        ? ['기준일 스냅샷이 없습니다.', '가격/할인 정보가 일부 누락되었습니다.']
        : ['공개 화면 스냅샷과 계산 지표 기반입니다.', '상품 옵션과 프로모션 표기 변경에 영향을 받을 수 있습니다.']
    ),
    metricCatalog: OLIVE_YOUNG_METRIC_CATALOG,
    summary: buildSummary(kind),
    currentSnapshot: snapshots[0],
    snapshots,
    timeline: buildTimeline(kind),
    reviewVoc: buildReviewVoc(kind),
  };
}

export const OLIVE_YOUNG_ANALYSIS_FIXTURES: Record<OliveYoungScenarioId, OliveYoungAnalysisViewModel> = {
  strong_signal_without_confounders: buildAnalysis('strong'),
  ranking_up_with_promotion_confounders: buildAnalysis('promotion'),
  review_risk: buildAnalysis('risk'),
  partial_data: buildAnalysis('partial'),
};

export const DEFAULT_OLIVE_YOUNG_SCENARIO: OliveYoungScenarioId = 'ranking_up_with_promotion_confounders';
