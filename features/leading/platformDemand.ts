export type LeadingPlatform = 'YouTube' | 'Instagram' | 'Meta Ads' | 'TikTok';

export type DemandSignalBandTone = 'strong' | 'medium' | 'consideration' | 'low';

export type PlatformDataMode = 'PERMISSION_DATA' | 'PUBLIC_FALLBACK' | 'AD_MANAGER' | 'CREATOR_ANALYTICS';

export type PlatformDemandMetric = {
  id: string;
  name: string;
  formula: string;
  reason: string;
  weight: number;
  score: number;
  valueLabel: string;
  dataMode: PlatformDataMode;
};

export type NegativeBarrierPenalty = {
  value: number;
  label: string;
  reason: string;
};

export type PublicFallbackModel = {
  scoreName: string;
  formula: string[];
  metrics: Array<Pick<PlatformDemandMetric, 'id' | 'name' | 'formula' | 'reason' | 'weight'>>;
  reliabilityLabel: string;
  reliabilityReason: string;
};

export type PlatformDemandModel = {
  platform: LeadingPlatform;
  scoreName: string;
  formula: string[];
  score: number;
  dataModeLabel: string;
  reliabilityLabel: '높음' | '중간' | '낮음' | '낮음~중간';
  reliabilityReason: string;
  platformRole: string;
  summary: string;
  metrics: PlatformDemandMetric[];
  negativeBarrierPenalty?: NegativeBarrierPenalty;
  publicFallback?: PublicFallbackModel;
};

export type DemandSignalBand = {
  min: number;
  max: number;
  label: string;
  description: string;
  tone: DemandSignalBandTone;
};

export const LEADING_PLATFORMS: LeadingPlatform[] = ['YouTube', 'Instagram', 'Meta Ads', 'TikTok'];

export const DEMAND_SIGNAL_BANDS: DemandSignalBand[] = [
  {
    min: 80,
    max: 100,
    label: '강한 수요 신호',
    description: '광고 이후 상품 검토 행동이 뚜렷하게 관찰됩니다.',
    tone: 'strong',
  },
  {
    min: 60,
    max: 79,
    label: '중간 이상 수요 신호',
    description: '수요 형성 가능성은 높지만 후행지표와 함께 확인해야 합니다.',
    tone: 'medium',
  },
  {
    min: 40,
    max: 59,
    label: '관심은 있으나 구매 검토 신호 약함',
    description: '반응은 있으나 상품 탐색 또는 구매 검토 행동은 제한적입니다.',
    tone: 'consideration',
  },
  {
    min: 0,
    max: 39,
    label: '수요 신호 약함',
    description: '현재 데이터만으로는 상품 수요를 강하게 보기 어렵습니다.',
    tone: 'low',
  },
];

export function calculateDemandSignalScore(metrics: PlatformDemandMetric[], penalty = 0) {
  const weightedScore = metrics.reduce((sum, metric) => sum + metric.score * metric.weight, 0);
  return Math.max(0, Math.min(100, Math.round(weightedScore - penalty)));
}

export function getDemandSignalBand(score: number): DemandSignalBand {
  return DEMAND_SIGNAL_BANDS.find((band) => score >= band.min && score <= band.max) ?? DEMAND_SIGNAL_BANDS[DEMAND_SIGNAL_BANDS.length - 1];
}

export function formatDemandWeight(weight: number) {
  return `${Math.round(weight * 100)}%`;
}

const youtubeMetrics: PlatformDemandMetric[] = [
  {
    id: 'creator_view_lift',
    name: 'Creator View Lift',
    formula: '해당 영상 조회수 / 해당 채널 최근 N개 영상 조회수 중앙값',
    reason: '대형 채널은 원래 조회수가 높기 때문에 절대 조회수가 아니라 크리에이터 평소 영상 대비 리프트를 봅니다.',
    weight: 0.2,
    score: 86,
    valueLabel: '평소 대비 1.42배',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'early_view_velocity',
    name: 'Early View Velocity',
    formula: '게시 후 72시간 조회수 / 72',
    reason: '초기 72시간 반응은 콘텐츠가 시장에서 빠르게 받아들여졌는지 확인하는 지표입니다.',
    weight: 0.15,
    score: 79,
    valueLabel: '시간당 1,320회',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'purchase_intent_comment_rate',
    name: 'Purchase Intent Comment Rate',
    formula: '구매의도 댓글 수 / 전체 댓글 수',
    reason: '어디서 사는지, 옵션, 피부 타입, 올리브영 입점 여부를 묻는 댓글은 명시적인 구매 검토 신호입니다.',
    weight: 0.3,
    score: 88,
    valueLabel: '구매의도 댓글 18.6%',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'watch_depth',
    name: 'Watch Depth',
    formula: '평균 시청 시간 / 영상 길이',
    reason: '화장품 리뷰/설명형 영상은 오래 볼수록 제품 이해와 구매 검토가 깊어졌다고 볼 수 있습니다.',
    weight: 0.2,
    score: 82,
    valueLabel: '평균 시청 비율 64%',
    dataMode: 'CREATOR_ANALYTICS',
  },
  {
    id: 'share_subscribe_demand_rate',
    name: 'Share / Subscribe Demand Rate',
    formula: '(공유 수 + 신규 구독자 수 x 1.5) / 조회수',
    reason: '공유는 추천 행동이고 신규 구독은 지속 관심이므로 장기 수요 판단에 유용합니다.',
    weight: 0.15,
    score: 74,
    valueLabel: '공유/구독 수요 2.8%',
    dataMode: 'CREATOR_ANALYTICS',
  },
];

const instagramMetrics: PlatformDemandMetric[] = [
  {
    id: 'save_intent_rate',
    name: 'Save Intent Rate',
    formula: '저장 수 / 도달 수',
    reason: '저장은 나중에 다시 보겠다는 행동이므로 색상, 호수, 피부 고민 해결 후보를 남기는 강한 구매 후보 신호입니다.',
    weight: 0.25,
    score: 76,
    valueLabel: '저장률 4.9%',
    dataMode: 'PERMISSION_DATA',
  },
  {
    id: 'share_recommendation_rate',
    name: 'Share Recommendation Rate',
    formula: '공유 수 / 도달 수',
    reason: '공유는 지인에게 전달하는 행동이므로 단순 호감보다 추천성 수요에 가깝습니다.',
    weight: 0.2,
    score: 71,
    valueLabel: '공유율 2.4%',
    dataMode: 'PERMISSION_DATA',
  },
  {
    id: 'profile_link_action_rate',
    name: 'Profile / Link Action Rate',
    formula: '(프로필 방문 수 + 링크 클릭 수 x 2 + 제품 태그 클릭 수 x 2) / 도달 수',
    reason: '콘텐츠를 본 뒤 프로필, 링크, 제품 태그로 이동했다면 구매 경로에 가까워진 행동입니다.',
    weight: 0.25,
    score: 68,
    valueLabel: '이동 행동 3.2%',
    dataMode: 'PERMISSION_DATA',
  },
  {
    id: 'instagram_purchase_intent_comment_rate',
    name: 'Purchase Intent Comment Rate',
    formula: '구매의도 댓글 수 / 전체 댓글 수',
    reason: '몇 호인지, 올영 입점 여부, 링크를 묻는 댓글은 명시적인 구매 직전 검토 질문입니다.',
    weight: 0.2,
    score: 84,
    valueLabel: '구매의도 댓글 14.8%',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'barrier_adjusted_demand_rate',
    name: 'Barrier-adjusted Demand Rate',
    formula: '((저장 + 공유 + 프로필/링크 행동 + 구매의도 댓글) / 도달 수) x (1 - 부정 장벽률)',
    reason: '관심이 많아도 밀림, 눈시림, 가격 부담, 광고 피로가 많으면 실제 검토 신호를 낮춰 봅니다.',
    weight: 0.1,
    score: 63,
    valueLabel: '부정 장벽률 9.5%',
    dataMode: 'PERMISSION_DATA',
  },
];

const metaAdsMetrics: PlatformDemandMetric[] = [
  {
    id: 'landing_action_rate',
    name: 'Landing Action Rate',
    formula: '(랜딩 클릭 + 제품 상세 클릭 x 1.5) / 도달 수',
    reason: 'Meta Ads는 피드 안 반응보다 랜딩 또는 제품 상세로 이동했는지가 구매 검토에 더 가깝습니다.',
    weight: 0.3,
    score: 64,
    valueLabel: '랜딩 행동 2.9%',
    dataMode: 'AD_MANAGER',
  },
  {
    id: 'creative_hold_rate',
    name: 'Creative Hold Rate',
    formula: '3초 이상 시청 수 / 노출 수',
    reason: '광고 피로가 큰 플랫폼이므로 소재가 초반 이탈을 막는지 먼저 확인해야 합니다.',
    weight: 0.2,
    score: 58,
    valueLabel: '3초 이상 31%',
    dataMode: 'AD_MANAGER',
  },
  {
    id: 'audience_efficiency',
    name: 'Audience Efficiency Score',
    formula: '클릭률 / CPC 변화율',
    reason: '클릭률이 높아도 CPC가 급등하면 확장 효율이 약해질 수 있습니다.',
    weight: 0.2,
    score: 61,
    valueLabel: 'CTR 1.8%, CPC 안정',
    dataMode: 'AD_MANAGER',
  },
  {
    id: 'meta_comment_intent',
    name: 'Comment Intent Score',
    formula: '상품 질문 댓글 수 / 전체 댓글 수',
    reason: '광고 댓글 중 상품 질문 비중이 높으면 단순 노출보다 검토 신호로 볼 수 있습니다.',
    weight: 0.15,
    score: 54,
    valueLabel: '상품 질문 7.2%',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'frequency_control',
    name: 'Frequency Control Score',
    formula: '목표 빈도 대비 실제 빈도 안정성',
    reason: '빈도가 과도하면 클릭 비용과 부정 반응이 함께 커질 수 있어 수요 판단을 보수적으로 봅니다.',
    weight: 0.15,
    score: 57,
    valueLabel: '빈도 2.8회',
    dataMode: 'AD_MANAGER',
  },
];

const tiktokMetrics: PlatformDemandMetric[] = [
  {
    id: 'viral_velocity',
    name: 'Viral Velocity Score',
    formula: '게시 후 24시간 조회수 / 게시 후 시간',
    reason: 'TikTok은 초기 확산 속도가 콘텐츠 수요와 알고리즘 반응을 가르는 핵심 신호입니다.',
    weight: 0.25,
    score: 72,
    valueLabel: '시간당 2,140회',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'completion_rewatch',
    name: 'Completion / Rewatch Score',
    formula: '(완주율 + 반복 시청률) / 2',
    reason: '짧은 사용감 영상에서는 끝까지 보고 다시 보는 행동이 제품 이해와 관심을 나타냅니다.',
    weight: 0.25,
    score: 69,
    valueLabel: '완주/반복 41%',
    dataMode: 'CREATOR_ANALYTICS',
  },
  {
    id: 'share_save_rate',
    name: 'Share / Save Rate',
    formula: '(공유 수 + 저장 수) / 조회수',
    reason: '공유와 저장은 단순 좋아요보다 무거운 행동이며 사용감/전후 비교 콘텐츠에서 특히 중요합니다.',
    weight: 0.2,
    score: 77,
    valueLabel: '공유/저장 5.1%',
    dataMode: 'PERMISSION_DATA',
  },
  {
    id: 'tiktok_purchase_intent_comment',
    name: 'Purchase Intent Comment Rate',
    formula: '구매의도 댓글 수 / 전체 댓글 수',
    reason: '어디서 구매하는지, 피부 타입에 맞는지 묻는 댓글은 숏폼에서도 중요한 구매 검토 신호입니다.',
    weight: 0.2,
    score: 66,
    valueLabel: '구매의도 댓글 11.4%',
    dataMode: 'PUBLIC_FALLBACK',
  },
  {
    id: 'creator_sound_reuse',
    name: 'Creator / Sound Reuse Score',
    formula: '2차 창작 수 + 사운드 사용 증가율',
    reason: 'TikTok에서는 사운드/포맷 재사용이 확산 신호가 될 수 있으나 구매 검토와는 분리해 해석합니다.',
    weight: 0.1,
    score: 52,
    valueLabel: '재사용 18건',
    dataMode: 'PUBLIC_FALLBACK',
  },
];

export const PLATFORM_DEMAND_MODELS: Record<LeadingPlatform, PlatformDemandModel> = {
  YouTube: {
    platform: 'YouTube',
    scoreName: 'YouTube Demand Signal Score',
    formula: [
      'Creator View Lift Score x 0.20',
      '+ Early View Velocity Score x 0.15',
      '+ Purchase Intent Comment Score x 0.30',
      '+ Watch Depth Score x 0.20',
      '+ Share / Subscribe Demand Score x 0.15',
      '- Negative Barrier Penalty',
    ],
    score: calculateDemandSignalScore(youtubeMetrics, 2),
    dataModeLabel: '권한 데이터 + 공개 반응',
    reliabilityLabel: '중간',
    reliabilityReason: '시청 지속, 공유, 신규 구독자는 채널 권한 데이터가 필요하므로 공개 댓글/조회 기반 지표와 함께 해석합니다.',
    platformRole: '유튜브는 깊은 검토형 플랫폼입니다. 단순 조회수보다 댓글의 구매 의도, 시청 지속, 평소 대비 조회 리프트를 중요하게 봅니다.',
    summary: '해당 상품은 구매 질문 댓글과 크리에이터 평소 대비 조회 리프트가 함께 높아 깊은 검토 수요 신호가 관찰됩니다.',
    metrics: youtubeMetrics,
    negativeBarrierPenalty: {
      value: 2,
      label: 'Negative Barrier Penalty',
      reason: '가격 부담과 눈시림 우려가 일부 댓글에서 관찰되어 총점에서 소폭 차감합니다.',
    },
    publicFallback: {
      scoreName: 'YouTube Public Demand Signal Score',
      formula: [
        'Creator View Lift Score x 0.25',
        '+ Early View Velocity Score x 0.20',
        '+ Purchase Intent Comment Score x 0.35',
        '+ Comment Density Score x 0.10',
        '+ Product Clarity Score x 0.10',
        '- Negative Barrier Penalty',
      ],
      metrics: [
        {
          id: 'comment_density',
          name: 'Comment Density',
          formula: '댓글 수 / 조회수',
          reason: '댓글은 좋아요보다 무거운 행동이지만 부정 이슈로도 늘 수 있어 구매의도 댓글률과 함께 봅니다.',
          weight: 0.1,
        },
        {
          id: 'product_clarity',
          name: 'Product Clarity Score',
          formula: '정확한 상품명 언급 댓글 수 / 제품 관련 댓글 수',
          reason: '영상은 반응이 좋아도 제품명이 기억되지 않으면 구매 검토로 이어지기 어렵습니다.',
          weight: 0.1,
        },
      ],
      reliabilityLabel: '낮음~중간',
      reliabilityReason: '시청 지속, 공유, 신규 구독자 데이터가 없으면 공개 데이터 중심으로 보수적으로 추정합니다.',
    },
  },
  Instagram: {
    platform: 'Instagram',
    scoreName: 'Instagram Purchase Intent Score',
    formula: [
      'Save Intent Score x 0.25',
      '+ Share Recommendation Score x 0.20',
      '+ Profile / Link Action Score x 0.25',
      '+ Purchase Intent Comment Score x 0.20',
      '+ Barrier-adjusted Demand Score x 0.10',
    ],
    score: calculateDemandSignalScore(instagramMetrics),
    dataModeLabel: '권한 데이터 중심',
    reliabilityLabel: '중간',
    reliabilityReason: '저장, 공유, 프로필/링크 행동은 계정 권한 데이터가 있을 때 신뢰도가 높습니다.',
    platformRole: '인스타그램은 저장, 공유, 프로필 이동이 핵심입니다. 화장품에서는 저장이 강한 구매 후보 신호입니다.',
    summary: '저장과 구매 질문 댓글은 양호하지만 링크/제품 태그 행동은 더 확인이 필요해 중간 이상 수요 신호로 해석합니다.',
    metrics: instagramMetrics,
    publicFallback: {
      scoreName: 'Instagram Public Demand Signal Score',
      formula: [
        'Engagement Lift Score x 0.25',
        '+ Comment Density Score x 0.20',
        '+ Purchase Intent Comment Score x 0.30',
        '+ Product Clarity Score x 0.15',
        '+ Negative Barrier Control Score x 0.10',
      ],
      metrics: [
        {
          id: 'engagement_lift',
          name: 'Engagement Lift Score',
          formula: '해당 콘텐츠 참여율 / 계정 최근 N개 콘텐츠 참여율 중앙값',
          reason: '공개 경쟁 콘텐츠는 저장/공유를 볼 수 없으므로 계정 평소 대비 반응을 보수적으로 사용합니다.',
          weight: 0.25,
        },
        {
          id: 'negative_barrier_control',
          name: 'Negative Barrier Control Score',
          formula: '1 - 부정 장벽 댓글률',
          reason: '광고 같음, 가격 부담, 사용감 불만이 많으면 공개 반응 점수를 낮춰 봅니다.',
          weight: 0.1,
        },
      ],
      reliabilityLabel: '낮음~중간',
      reliabilityReason: '저장, 공유, 프로필/링크 행동 데이터가 없어 공개 반응 기반으로만 추정합니다.',
    },
  },
  'Meta Ads': {
    platform: 'Meta Ads',
    scoreName: 'Meta Paid Response Quality Score',
    formula: [
      'Landing Action Score x 0.30',
      '+ Creative Hold Score x 0.20',
      '+ Audience Efficiency Score x 0.20',
      '+ Comment Intent Score x 0.15',
      '+ Frequency Control Score x 0.15',
      '- Negative Barrier Penalty',
    ],
    score: calculateDemandSignalScore(metaAdsMetrics, 3),
    dataModeLabel: '광고 관리자 데이터 중심',
    reliabilityLabel: '중간',
    reliabilityReason: '도달, 클릭, 랜딩 행동은 광고 관리자 데이터가 필요하며 댓글 의도는 공개 반응으로 보조합니다.',
    platformRole: 'Meta Ads는 수요를 만드는 콘텐츠 반응보다 랜딩 행동, 비용 안정성, 빈도 피로를 함께 봐야 합니다.',
    summary: '랜딩 행동은 관찰되지만 소재 유지력과 댓글 구매 의도는 제한적입니다. 확장 전 랜딩과 소재 초반부를 점검해야 합니다.',
    metrics: metaAdsMetrics,
    negativeBarrierPenalty: {
      value: 3,
      label: 'Negative Barrier Penalty',
      reason: '빈도 상승과 광고 피로성 댓글이 일부 관찰되어 총점에서 차감합니다.',
    },
  },
  TikTok: {
    platform: 'TikTok',
    scoreName: 'TikTok Viral Demand Signal Score',
    formula: [
      'Viral Velocity Score x 0.25',
      '+ Completion / Rewatch Score x 0.25',
      '+ Share / Save Score x 0.20',
      '+ Purchase Intent Comment Score x 0.20',
      '+ Creator / Sound Reuse Score x 0.10',
      '- Negative Barrier Penalty',
    ],
    score: calculateDemandSignalScore(tiktokMetrics, 1),
    dataModeLabel: '공개 반응 + 권한 데이터',
    reliabilityLabel: '중간',
    reliabilityReason: '초기 조회 속도와 댓글은 공개 데이터로 볼 수 있지만 완주율, 반복 시청, 저장은 권한 데이터가 필요합니다.',
    platformRole: 'TikTok은 초기 확산, 완주/반복 시청, 공유/저장을 중심으로 보되 구매 검토 댓글과 분리해서 해석합니다.',
    summary: '초기 확산과 공유/저장은 양호하지만 2차 확산은 제한적입니다. 숏폼 후행 반응은 광고 시점과 판매 채널 추이를 함께 봅니다.',
    metrics: tiktokMetrics,
    negativeBarrierPenalty: {
      value: 1,
      label: 'Negative Barrier Penalty',
      reason: '광고감 언급이 낮은 수준으로 관찰되어 총점에서 소폭 차감합니다.',
    },
  },
};

export function getPlatformDemandModel(platform: LeadingPlatform) {
  return PLATFORM_DEMAND_MODELS[platform];
}

export function buildDemandSummaryText(model: PlatformDemandModel) {
  const band = getDemandSignalBand(model.score);
  return `${model.scoreName}는 ${model.score}점으로 ${band.label}입니다. ${model.summary}`;
}
