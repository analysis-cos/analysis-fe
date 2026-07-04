import type {
  AccuracyGrade,
  CommerceEffectConfidence,
  CommerceEffectSignal,
  ConfounderType,
  DataAvailability,
  DataReliabilityLevel,
  DisplayRankDelta,
  OliveYoungDerivedEffect,
  OliveYoungMetricDefinition,
  SourceType,
} from './types';

export const AVAILABILITY_LABELS: Record<DataAvailability, string> = {
  PUBLIC_SNAPSHOT: '공개 화면 스냅샷',
  PARTNER_ONLY: '파트너 데이터 필요',
  MANUAL_UPLOAD: '수동 업로드 필요',
  DERIVED: '계산 지표',
  UNSUPPORTED: '제공 불가',
  NOT_CONNECTED: '연동 필요',
};

export const ACCURACY_GRADE_LABELS: Record<AccuracyGrade, string> = {
  A: '높음',
  B: '제한적 높음',
  C: '계산/추정',
  D: '낮음',
  X: '불가',
};

export const ACCURACY_GRADE_TOOLTIPS: Record<AccuracyGrade, string> = {
  A: '특정 시점의 공개 화면값 기준으로는 신뢰도가 높습니다.',
  B: '공개 화면에서 확인 가능하지만 옵션, 동적 로딩, 표기 변경에 영향을 받을 수 있습니다.',
  C: '원천값이 아니라 계산 또는 추정 지표입니다.',
  D: '실시간성 또는 수집 조건 때문에 핵심 판단 지표로 쓰기 어렵습니다.',
  X: '권한 또는 제휴 없이는 제공할 수 없습니다.',
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  public_page: '공개 화면',
  partner_data: '파트너',
  manual_upload: '수동 업로드',
  computed: '계산',
  fixture: '샘플',
  unsupported: '제공 불가',
};

export const RELIABILITY_LABELS: Record<DataReliabilityLevel, string> = {
  HIGH: '높음',
  MEDIUM: '중간',
  LOW: '낮음',
  UNKNOWN: '알 수 없음',
};

export const EFFECT_SIGNAL_LABELS: Record<CommerceEffectSignal, string> = {
  STRONG: '강함',
  MEDIUM: '중간',
  WEAK: '약함',
  NONE: '없음',
  UNKNOWN: '판단 불가',
};

export const CONFIDENCE_LABELS: Record<CommerceEffectConfidence, string> = {
  HIGH: '높음',
  MEDIUM: '중간',
  LOW: '낮음',
  UNKNOWN: '판단 불가',
};

export const CONFOUNDER_LABELS: Record<ConfounderType, string> = {
  DISCOUNT: '할인율 변화',
  COUPON: '쿠폰',
  GIFT: '증정',
  TODAY_DREAM: '오늘드림',
  PRICE_CHANGE: '가격 변화',
  STOCK: '품절/재입고',
  RELAUNCH: '리뉴얼/재출시',
  BUNDLE_CHANGE: '기획세트 변경',
  EXTERNAL_EVENT: '외부 이벤트',
  UNKNOWN: '확인 제한',
};

export function formatRank(rank?: number | null) {
  return typeof rank === 'number' ? `${rank}위` : '데이터 없음';
}

export function formatPriceKRW(value?: number | null) {
  return typeof value === 'number' ? `₩${value.toLocaleString('ko-KR')}` : '데이터 없음';
}

export function formatPercent(value?: number | null) {
  return typeof value === 'number' ? `${Math.round(value)}%` : '데이터 없음';
}

export function formatRating(value?: number | null) {
  return typeof value === 'number' ? value.toFixed(1) : '데이터 없음';
}

export function formatNumber(value?: number | null) {
  return typeof value === 'number' ? value.toLocaleString('ko-KR') : '데이터 없음';
}

export function formatDateTime(value?: string | null) {
  if (!value) return '데이터 없음';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

export function getAvailabilityLabel(availability: DataAvailability) {
  return AVAILABILITY_LABELS[availability];
}

export function getAccuracyGradeLabel(grade: AccuracyGrade) {
  return ACCURACY_GRADE_LABELS[grade];
}

export function getSourceTypeLabel(sourceType: SourceType) {
  return SOURCE_TYPE_LABELS[sourceType];
}

export function getReliabilityLabel(level: DataReliabilityLevel) {
  return RELIABILITY_LABELS[level];
}

export function getEffectSignalLabel(signal: CommerceEffectSignal) {
  return EFFECT_SIGNAL_LABELS[signal];
}

export function getConfidenceLabel(confidence: CommerceEffectConfidence) {
  return CONFIDENCE_LABELS[confidence];
}

export function isRestrictedMetric(metric: OliveYoungMetricDefinition) {
  return (
    metric.availability === 'PARTNER_ONLY' ||
    metric.availability === 'UNSUPPORTED' ||
    metric.availability === 'NOT_CONNECTED' ||
    metric.hiddenByDefault === true ||
    metric.isSensitive === true
  );
}

export function shouldShowInSummary(metric: OliveYoungMetricDefinition) {
  return metric.showInSummary && !isRestrictedMetric(metric);
}

export function normalizeRankDelta(currentRank?: number | null, previousRank?: number | null): DisplayRankDelta {
  if (typeof currentRank !== 'number' || typeof previousRank !== 'number') {
    return { absolute: 0, direction: 'unknown', label: '기준 데이터 없음' };
  }

  const rawDelta = previousRank - currentRank;
  const absolute = Math.abs(rawDelta);

  if (absolute === 0) {
    return { absolute, direction: 'flat', label: '변화 없음' };
  }

  if (rawDelta > 0) {
    return { absolute, direction: 'up', label: `${absolute}위 상승` };
  }

  return { absolute, direction: 'down', label: `${absolute}위 하락` };
}

export function formatRankDelta(currentRank?: number | null, previousRank?: number | null) {
  return normalizeRankDelta(currentRank, previousRank).label;
}

export function getConfounderDescription(type: ConfounderType) {
  const descriptions: Record<ConfounderType, string> = {
    DISCOUNT: '할인율 변화가 랭킹 상승에 영향을 줄 수 있습니다.',
    COUPON: '쿠폰 노출이 구매 반응에 영향을 줄 수 있습니다.',
    GIFT: '증정 구성은 랭킹과 신규 리뷰 수의 주요 변수입니다.',
    TODAY_DREAM: '배송 편의성이 구매 반응에 영향을 줄 수 있습니다.',
    PRICE_CHANGE: '가격 변화가 광고 효용 해석을 왜곡할 수 있습니다.',
    STOCK: '품절/재입고는 랭킹 변동의 주요 원인입니다.',
    RELAUNCH: '리뉴얼/재출시는 광고와 별개의 수요를 만들 수 있습니다.',
    BUNDLE_CHANGE: '기획세트 변경은 가격 비교와 리뷰 반응에 영향을 줍니다.',
    EXTERNAL_EVENT: '외부 바이럴/경쟁사 이벤트가 영향을 줄 수 있습니다.',
    UNKNOWN: '일부 이벤트 데이터가 없어 해석 신뢰도가 낮을 수 있습니다.',
  };

  return descriptions[type];
}

export function buildEffectSummaryText(summary: OliveYoungDerivedEffect) {
  const hasPromotionConfounder = summary.confounders.some((type) =>
    ['DISCOUNT', 'COUPON', 'GIFT', 'TODAY_DREAM', 'PRICE_CHANGE'].includes(type)
  );
  const hasReviewRisk = summary.warnings.some((warning) => warning.includes('부정적인 리뷰 반응') || warning.includes('평점'));

  if (hasReviewRisk) {
    return '리뷰 수 증가는 관찰되었지만 평점 또는 부정적인 리뷰 반응이 악화되었습니다. 광고 이후 유입된 관심이 실제 사용 경험 리스크와 함께 나타났을 수 있어 제품/소재 메시지 점검이 필요합니다.';
  }

  if (hasPromotionConfounder) {
    return '캠페인 이후 랭킹 상승이 관찰되었지만, 동일 기간 가격/프로모션 변화가 함께 발생했습니다. 광고 단독 효과보다는 광고와 프로모션이 결합된 커머스 연관 신호로 보는 것이 적절합니다.';
  }

  if (summary.effectSignal === 'STRONG') {
    return '캠페인 이후 랭킹과 리뷰 수가 함께 개선되었습니다. 가격/프로모션 변화가 크지 않아 올리브영 내 커머스 반응 신호가 비교적 선명합니다.';
  }

  if (summary.effectSignal === 'NONE') {
    return '현재 데이터 기준으로 뚜렷한 올리브영 커머스 연관 신호는 관찰되지 않았습니다. 추가 관측 기간 또는 수동 업로드 데이터가 필요합니다.';
  }

  return '일부 올리브영 커머스 반응 신호가 관찰되었지만, 데이터 범위와 혼선 요인을 함께 고려해야 합니다.';
}

export function hasForbiddenCommerceCopy(text: string) {
  const forbidden = ['매출 증가', '판매 증가', '전환 개선', '광고 효과 확정', '이 광고가 매출을 만들었습니다', '구매자가 증가했습니다'];
  return forbidden.some((phrase) => text.includes(phrase));
}
