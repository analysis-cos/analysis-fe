export type Platform = 'OLIVE_YOUNG';

export type DataAvailability =
  | 'PUBLIC_SNAPSHOT'
  | 'PARTNER_ONLY'
  | 'MANUAL_UPLOAD'
  | 'DERIVED'
  | 'UNSUPPORTED'
  | 'NOT_CONNECTED';

export type AccuracyGrade = 'A' | 'B' | 'C' | 'D' | 'X';

export type SourceType =
  | 'public_page'
  | 'partner_data'
  | 'manual_upload'
  | 'computed'
  | 'fixture'
  | 'unsupported';

export type MetricDomain =
  | 'RANKING'
  | 'RANKING_PRODUCT_CARD'
  | 'BRAND_RANKING'
  | 'PDP'
  | 'REVIEW'
  | 'QNA'
  | 'DERIVED_EFFECT';

export type DataReliabilityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export type CommerceEffectSignal = 'STRONG' | 'MEDIUM' | 'WEAK' | 'NONE' | 'UNKNOWN';

export type CommerceEffectConfidence = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export type ConfounderType =
  | 'DISCOUNT'
  | 'COUPON'
  | 'GIFT'
  | 'TODAY_DREAM'
  | 'PRICE_CHANGE'
  | 'STOCK'
  | 'RELAUNCH'
  | 'BUNDLE_CHANGE'
  | 'EXTERNAL_EVENT'
  | 'UNKNOWN';

export interface OliveYoungMetricDefinition {
  id: string;
  platform: Platform;
  domain: MetricDomain;
  nameKo: string;
  shortNameKo?: string;
  descriptionKo: string;
  availability: DataAvailability;
  accuracyGrade: AccuracyGrade;
  sourceType: SourceType;
  isPrimaryKpi: boolean;
  showInSummary: boolean;
  requiresLegalApproval?: boolean;
  isSensitive?: boolean;
  hiddenByDefault?: boolean;
  tooltipKo?: string;
}

export interface OliveYoungDataSourceStatus {
  platform: Platform;
  reliabilityLevel: DataReliabilityLevel;
  sourceTypes: SourceType[];
  lastObservedAt?: string;
  lastCollectedAt?: string;
  availableMetricCount: number;
  restrictedMetricCount: number;
  unsupportedMetricCount: number;
  dataQualityScore?: number;
  dataQualityReasons: string[];
  warnings: string[];
  limitations: string[];
}

export interface OliveYoungBadgeState {
  hasCoupon?: boolean;
  hasGift?: boolean;
  hasTodayDream?: boolean;
  hasOnePlusOne?: boolean;
  hasSale?: boolean;
}

export interface OliveYoungProductSnapshot {
  id: string;
  observedAt: string;
  collectedAt?: string;
  sourceUrl?: string;
  sourceType: SourceType;
  productId?: string;
  platformProductId?: string;
  goodsNo?: string;
  brandName?: string;
  productName: string;
  productImageUrl?: string;
  categoryName?: string;
  rank?: number | null;
  previousRank?: number | null;
  rankDelta?: number | null;
  normalPrice?: number | null;
  salePrice?: number | null;
  discountRate?: number | null;
  reviewCount?: number | null;
  rating?: number | null;
  badges?: OliveYoungBadgeState;
  dataQualityScore?: number;
  dataQualityReasons: string[];
}

export interface OliveYoungDerivedEffect {
  productId?: string;
  campaignId?: string;
  baselineDate?: string;
  metricDate?: string;
  rankDeltaD1?: number | null;
  rankDeltaD3?: number | null;
  rankDeltaD7?: number | null;
  rankDeltaD14?: number | null;
  reviewCountDeltaD7?: number | null;
  ratingDeltaD7?: number | null;
  priceChangeRate?: number | null;
  discountRateChange?: number | null;
  promotionChanged: boolean;
  confounders: ConfounderType[];
  effectSignal: CommerceEffectSignal;
  confidence: CommerceEffectConfidence;
  reasons: string[];
  warnings: string[];
}

export interface OliveYoungTimelinePoint {
  date: string;
  observedAt?: string;
  rank?: number | null;
  reviewCount?: number | null;
  rating?: number | null;
  normalPrice?: number | null;
  salePrice?: number | null;
  discountRate?: number | null;
  hasCoupon?: boolean;
  hasGift?: boolean;
  hasTodayDream?: boolean;
  eventLabels?: string[];
}

export interface OliveYoungReviewTopic {
  label: string;
  count?: number;
  ratio?: number;
  examples?: string[];
}

export interface OliveYoungReviewVocSummary {
  reviewCount?: number | null;
  reviewCountDelta?: number | null;
  rating?: number | null;
  positiveRatio?: number | null;
  negativeRatio?: number | null;
  neutralRatio?: number | null;
  positiveTopics: OliveYoungReviewTopic[];
  negativeTopics: OliveYoungReviewTopic[];
  purchaseReasonTags: Array<{
    label: string;
    count?: number;
    ratio?: number;
  }>;
  complaintTags: Array<{
    label: string;
    count?: number;
    ratio?: number;
  }>;
  dataQualityReasons: string[];
}

export interface OliveYoungAnalysisViewModel {
  status: OliveYoungDataSourceStatus;
  metricCatalog: OliveYoungMetricDefinition[];
  summary: OliveYoungDerivedEffect;
  currentSnapshot?: OliveYoungProductSnapshot;
  snapshots: OliveYoungProductSnapshot[];
  timeline: OliveYoungTimelinePoint[];
  reviewVoc?: OliveYoungReviewVocSummary;
}

export type OliveYoungScenarioId =
  | 'strong_signal_without_confounders'
  | 'ranking_up_with_promotion_confounders'
  | 'review_risk'
  | 'partial_data';

export type OliveYoungPanelState = 'loading' | 'empty' | 'error' | 'partial' | 'ready';

export interface DisplayRankDelta {
  absolute: number;
  direction: 'up' | 'down' | 'flat' | 'unknown';
  label: string;
}
