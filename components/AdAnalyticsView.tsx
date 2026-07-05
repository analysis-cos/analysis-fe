import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Eye,
  Instagram,
  MousePointerClick,
  Plus,
  Radio,
  ShieldAlert,
  Sparkles,
  ThumbsUp,
  Video,
  WalletCards,
  Youtube,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MOCK_PRODUCTS } from '../constants';
import {
  LEADING_PLATFORMS,
  buildDemandSummaryText,
  getDemandSignalBand,
  getPlatformDemandModel,
  type DemandSignalBandTone,
  type LeadingPlatform,
  type PlatformDemandModel,
} from '../features/leading/platformDemand';

type Platform = LeadingPlatform;
type DemandAnalysisView = 'dashboard' | Platform;

interface Campaign {
  id: string;
  platform: Platform;
  productRank: number;
  name: string;
  creative: string;
  url: string;
  spend: number;
  impressions: number;
  clicks: number;
  engagements: number;
  startDate: string;
  targetChannel: string;
}

interface AdAnalyticsViewProps {
  selectedProductRank: number;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  YouTube: <Youtube className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  'Meta Ads': <Radio className="w-4 h-4" />,
  TikTok: <Video className="w-4 h-4" />,
};

const demandToneClass: Record<DemandSignalBandTone, string> = {
  strong: 'bg-[#6dec13] text-gray-950',
  medium: 'bg-blue-50 text-blue-700',
  consideration: 'bg-amber-50 text-amber-700',
  low: 'bg-gray-100 text-gray-600',
};

const demandScoreToneClass: Record<DemandSignalBandTone, string> = {
  strong: 'text-[#6dec13]',
  medium: 'text-blue-300',
  consideration: 'text-amber-300',
  low: 'text-gray-300',
};

const campaignSeedPlatforms: Platform[] = LEADING_PLATFORMS;
const campaignSeedChannels = ['올리브영', '쿠팡', '네이버', '올리브영'];
const campaignSeedCreatives = ['롱폼 리뷰 영상', '릴스 체험단', '리타겟팅 배너', '15초 사용감 영상'];

const initialCampaigns: Campaign[] = MOCK_PRODUCTS.slice(0, 10).flatMap((product, productIndex) =>
  campaignSeedPlatforms.map((platform, platformIndex) => {
    const spend = [7800000, 4200000, 3600000, 2800000][platformIndex] + productIndex * 180000;

    return {
      id: `c-${product.rank}-${platform.toLowerCase().replace(/\s/g, '-')}`,
      platform,
      productRank: product.rank,
      name: `${product.brand} ${campaignSeedCreatives[platformIndex]} 캠페인`,
      creative: campaignSeedCreatives[platformIndex],
      url:
        platform === 'YouTube'
          ? 'https://www.youtube.com/watch?v=sample1'
          : platform === 'Instagram'
            ? 'https://www.instagram.com/reel/sample'
            : platform === 'TikTok'
              ? 'https://www.tiktok.com/@sample/video/1'
              : 'https://ads.example.com/meta',
      spend,
      impressions: Math.round(spend / 18) + productIndex * 8400 + platformIndex * 5200,
      clicks: Math.round(spend / 430) + productIndex * 420 + platformIndex * 180,
      engagements: Math.round(spend / 250) + productIndex * 680 + platformIndex * 260,
      startDate: `01.${String(8 + ((productIndex + platformIndex) % 7)).padStart(2, '0')}`,
      targetChannel: campaignSeedChannels[platformIndex],
    };
  })
);

const trendData = [
  { day: '01.08', spend: 210, impressions: 58, clicks: 2.1 },
  { day: '01.09', spend: 260, impressions: 72, clicks: 2.8 },
  { day: '01.10', spend: 340, impressions: 96, clicks: 3.9 },
  { day: '01.11', spend: 310, impressions: 88, clicks: 3.4 },
  { day: '01.12', spend: 420, impressions: 118, clicks: 4.6 },
  { day: '01.13', spend: 510, impressions: 142, clicks: 5.8 },
  { day: '01.14', spend: 560, impressions: 168, clicks: 6.2 },
];

const creativeCompareData = [
  { type: '롱폼 리뷰', youtube: 4.3, instagram: 2.1, tiktok: 2.8 },
  { type: '릴스 체험', youtube: 2.6, instagram: 5.8, tiktok: 4.1 },
  { type: '숏폼 사용감', youtube: 2.9, instagram: 4.7, tiktok: 6.2 },
  { type: '배너 리타겟팅', youtube: 1.8, instagram: 3.2, tiktok: 2.4 },
];

const contentFormatRows = [
  { format: '사용 전/후 비교', response: '참여율 6.2%', fit: '후행 연결 좋음', action: '다음 소재 유지' },
  { format: '성분 설명형', response: '저장률 4.8%', fit: '검색 유입 보조', action: '썸네일 개선' },
  { format: '크리에이터 루틴', response: '댓글률 3.1%', fit: '신뢰 형성', action: '롱폼 확장' },
];

const referenceRows = [
  { message: '7일 진정 루틴', hook: '민감 피부 사용 장면', platform: 'YouTube', signal: '완주율 높음' },
  { message: '산뜻한 출근템', hook: '끈적임 없는 사용감', platform: 'Instagram', signal: '저장 증가' },
  { message: '속건조 케어', hook: '메이크업 전 보습', platform: 'TikTok', signal: '공유 증가' },
];

const creatorCandidateRows = [
  { name: '뷰티로그', group: '미드', fit: '롱폼 적합', reason: '리뷰형 콘텐츠 반응 안정적' },
  { name: '스킨케어 마스터', group: '마이크로', fit: '댓글 대응', reason: '댓글 질의응답 활발' },
  { name: '데일리 루틴', group: '미드', fit: '릴스 적합', reason: '짧은 사용 장면 반응 우수' },
];

const brandMentionRows = [
  { brand: '자사', mention: '+38%', context: '사용감 긍정 언급', risk: '낮음' },
  { brand: '경쟁 A', mention: '+24%', context: '쿠폰 캠페인 언급', risk: '중간' },
  { brand: '경쟁 B', mention: '+17%', context: '향 불만 언급', risk: '기회' },
];

const savedContentRows = [
  { title: '선크림 출근 루틴 릴스', tag: '다음 소재', owner: '브랜드팀', status: '브리프 후보' },
  { title: '7일 진정 롱폼 리뷰', tag: '크리에이터', owner: '마케팅팀', status: '집행 검토' },
  { title: '성분 설명 쇼츠', tag: '참고 자료', owner: '콘텐츠팀', status: '저장됨' },
];

function formatCurrency(value: number) {
  if (value >= 1000000) return `₩${(value / 1000000).toFixed(1)}M`;
  return `₩${Math.round(value / 10000)}만`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

type IntegratedPlatformRow = {
  platform: Platform;
  model: PlatformDemandModel;
  band: ReturnType<typeof getDemandSignalBand>;
  spend: number;
  campaignCount: number;
  topMetricName: string;
  topMetricValue: string;
  action: string;
};

function getPlatformAction(score: number, campaignCount: number) {
  if (campaignCount === 0) return '집행 없음';
  if (score >= 80) return '후행 반응 확인';
  if (score >= 60) return '소재 유지 점검';
  if (score >= 40) return '구매 질문 보강';
  return '소재 재점검';
}

function LeadingIntegratedDashboard({
  rows,
  overallScore,
}: {
  rows: IntegratedPlatformRow[];
  overallScore: number;
}) {
  const overallBand = getDemandSignalBand(overallScore);
  const activeRows = rows.filter((row) => row.campaignCount > 0);
  const strongestRow = activeRows.reduce((best, row) => (row.model.score > best.model.score ? row : best), activeRows[0] ?? rows[0]);
  const reviewRow = activeRows.reduce((lowest, row) => (row.model.score < lowest.model.score ? row : lowest), activeRows[0] ?? rows[0]);

  return (
    <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-6 md:p-8 shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-7">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">선행지표 대시보드</p>
          <h3 className="mt-2 text-2xl font-black text-gray-900">상품 기준으로 광고 플랫폼 반응을 한눈에 봅니다</h3>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-relaxed text-gray-500">
            플랫폼별 반응을 하나의 상품 관점으로 묶어, 어떤 반응을 판매 채널 지표와 함께 확인해야 하는지 먼저 봅니다.
          </p>
        </div>
        <span className={`w-fit rounded-xl px-4 py-2 text-xs font-black ${demandToneClass[overallBand.tone]}`}>
          {overallBand.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl bg-gray-900 p-5 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">통합 선행 신호</p>
          <p className="mt-2 text-4xl font-black text-[#6dec13]">{overallScore}</p>
          <p className="mt-1 text-xs font-bold text-gray-400">집행 금액을 반영한 상품 단위 신호</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">가장 뚜렷한 플랫폼</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-black text-gray-900">
            {platformIcons[strongestRow.platform]}
            {strongestRow.platform}
          </p>
          <p className="mt-1 text-xs font-bold text-gray-500">{strongestRow.model.score}점 · {strongestRow.band.label}</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">집행 플랫폼</p>
          <p className="mt-2 text-lg font-black text-gray-900">{activeRows.length}개</p>
          <p className="mt-1 text-xs font-bold text-gray-500">이 상품에 연결된 선행 플랫폼</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">우선 확인</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-black text-gray-900">
            {platformIcons[reviewRow.platform]}
            {reviewRow.platform}
          </p>
          <p className="mt-1 text-xs font-bold text-gray-500">{reviewRow.action}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[#ecf3e7]">
        <div className="grid grid-cols-[1fr_120px_140px_1.2fr_120px] gap-4 bg-[#f7f8f6] px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c] max-lg:hidden">
          <span>플랫폼</span>
          <span>캠페인</span>
          <span>집행 금액</span>
          <span>핵심 신호</span>
          <span className="text-right">판단</span>
        </div>
        <div className="divide-y divide-[#ecf3e7]">
          {rows.map((row) => (
            <div key={row.platform} className="grid grid-cols-1 lg:grid-cols-[1fr_120px_140px_1.2fr_120px] gap-4 bg-white px-5 py-4 items-center">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-gray-900">
                  {platformIcons[row.platform]}
                  {row.platform}
                </p>
                <p className="mt-1 text-xs font-bold text-gray-400">{row.model.scoreName}</p>
              </div>
              <p className="text-sm font-black text-gray-900">{row.campaignCount}개</p>
              <p className="text-sm font-black text-gray-900">{formatCurrency(row.spend)}</p>
              <div>
                <p className="text-sm font-black text-gray-900">{row.topMetricValue}</p>
                <p className="mt-1 text-xs font-bold text-gray-500">{row.topMetricName}</p>
              </div>
              <div className="lg:text-right">
                <p className="text-sm font-black text-gray-900">{row.model.score}점</p>
                <span className={`mt-1 inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black ${demandToneClass[row.band.tone]}`}>
                  {row.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemandViewTabs({
  activeView,
  onViewChange,
}: {
  activeView: DemandAnalysisView;
  onViewChange: (view: DemandAnalysisView) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">분석 보기</p>
          <p className="mt-1 text-sm font-bold text-gray-500">전체 요약 또는 플랫폼별 상세를 선택합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="선행지표 분석 보기 선택">
          <button
            type="button"
            onClick={() => onViewChange('dashboard')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
              activeView === 'dashboard' ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
            }`}
            aria-selected={activeView === 'dashboard'}
            role="tab"
          >
            <Radio className="w-4 h-4" />
            대시보드
          </button>
          {LEADING_PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => onViewChange(platform)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
                activeView === platform ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
              }`}
              aria-selected={activeView === platform}
              role="tab"
            >
              {platformIcons[platform]}
              {platform}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformDemandSection({ model }: { model: PlatformDemandModel }) {
  const band = getDemandSignalBand(model.score);

  return (
    <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-6 md:p-8 shadow-sm">
      <div className="mb-7">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">플랫폼별 수요 신호 판단</p>
          <h3 className="mt-2 text-2xl font-black text-gray-900">플랫폼마다 다른 행동을 다르게 해석합니다</h3>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-relaxed text-gray-500">
            조회수, 저장, 공유, 댓글, 시청 지속은 플랫폼마다 의미가 다릅니다. 선택한 플랫폼에서 무엇이 강한 신호인지 간결하게 확인합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 rounded-[2rem] bg-gray-900 p-6 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-black">
              {platformIcons[model.platform]}
              {model.platform}
            </span>
            <span className={`rounded-xl px-3 py-2 text-xs font-black ${demandToneClass[band.tone]}`}>
              {band.label}
            </span>
          </div>

          <p className="mt-6 text-sm font-black text-gray-400">{model.scoreName}</p>
          <div className="mt-2 flex items-end gap-2">
            <p className={`text-6xl font-black tracking-tight ${demandScoreToneClass[band.tone]}`}>{model.score}</p>
            <p className="pb-2 text-sm font-black text-gray-400">/ 100</p>
          </div>

          <p className="mt-5 text-sm font-bold leading-relaxed text-gray-300">{model.platformRole}</p>
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-bold leading-relaxed text-white">
            {buildDemandSummaryText(model)}
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/8 p-4 text-xs">
            <p className="font-black text-gray-400">신뢰도</p>
            <p className="mt-1 font-black text-white">{model.reliabilityLabel}</p>
          </div>
          <p className="mt-3 text-xs font-bold leading-relaxed text-gray-400">{model.reliabilityReason}</p>
        </div>

        <div className="xl:col-span-8 space-y-4">
          {model.negativeBarrierPenalty && (
            <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldAlert className="w-4 h-4" />
                <p className="text-sm font-black">해석 주의 요인: -{model.negativeBarrierPenalty.value}점</p>
              </div>
              <p className="mt-2 text-xs font-bold leading-relaxed text-amber-700">{model.negativeBarrierPenalty.reason}</p>
            </div>
          )}

          <div className="overflow-hidden rounded-[2rem] border border-[#ecf3e7]">
            <div className="grid grid-cols-[1.2fr_0.9fr_120px] gap-4 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
              <span>지표</span>
              <span>관찰된 신호</span>
              <span className="text-right">신호 점수</span>
            </div>
            <div className="divide-y divide-[#ecf3e7] bg-white">
              {model.metrics.map((metric) => (
                <div key={metric.id} className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_120px] gap-4 px-5 py-4">
                  <div>
                    <p className="text-sm font-black text-gray-900">{metric.name}</p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-gray-400">{metric.reason}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-black text-gray-900">{metric.valueLabel}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-right text-xs font-black text-gray-900">{metric.score}점</p>
                    <div className="mt-2 h-2 rounded-full bg-[#ecf3e7] overflow-hidden" aria-hidden="true">
                      <div className="h-full rounded-full bg-[#6dec13]" style={{ width: `${metric.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AdAnalyticsView: React.FC<AdAnalyticsViewProps> = ({ selectedProductRank }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [activePlatform, setActivePlatform] = useState<Platform | '전체'>('전체');
  const [activeDemandView, setActiveDemandView] = useState<DemandAnalysisView>('dashboard');
  const [newUrl, setNewUrl] = useState('');
  const [newPlatform, setNewPlatform] = useState<Platform>('YouTube');
  const [newSpend, setNewSpend] = useState('1200000');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const platformMatched = activePlatform === '전체' || campaign.platform === activePlatform;
      return platformMatched && campaign.productRank === selectedProductRank;
    });
  }, [campaigns, activePlatform, selectedProductRank]);

  const selectedProduct = MOCK_PRODUCTS.find((product) => product.rank === selectedProductRank) ?? MOCK_PRODUCTS[0];
  const allForProduct = campaigns.filter((campaign) => campaign.productRank === selectedProductRank);
  const activeDemandModel = activeDemandView === 'dashboard' ? null : getPlatformDemandModel(activeDemandView);

  const totals = allForProduct.reduce(
    (acc, campaign) => ({
      spend: acc.spend + campaign.spend,
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      engagements: acc.engagements + campaign.engagements,
    }),
    { spend: 0, impressions: 0, clicks: 0, engagements: 0 }
  );

  const platformData = LEADING_PLATFORMS.map((platform) => {
    const platformCampaigns = allForProduct.filter((campaign) => campaign.platform === platform);
    return {
      platform,
      spend: platformCampaigns.reduce((sum, campaign) => sum + campaign.spend / 10000, 0),
      clicks: platformCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0),
    };
  });

  const integratedRows: IntegratedPlatformRow[] = LEADING_PLATFORMS.map((platform) => {
    const platformCampaigns = allForProduct.filter((campaign) => campaign.platform === platform);
    const model = getPlatformDemandModel(platform);
    const topMetric = model.metrics.reduce((best, metric) => (
      metric.score * metric.weight > best.score * best.weight ? metric : best
    ), model.metrics[0]);

    return {
      platform,
      model,
      band: getDemandSignalBand(model.score),
      spend: platformCampaigns.reduce((sum, campaign) => sum + campaign.spend, 0),
      campaignCount: platformCampaigns.length,
      topMetricName: topMetric.name,
      topMetricValue: topMetric.valueLabel,
      action: getPlatformAction(model.score, platformCampaigns.length),
    };
  });

  const totalIntegratedSpend = integratedRows.reduce((sum, row) => sum + row.spend, 0);
  const overallLeadingScore = Math.round(
    totalIntegratedSpend > 0
      ? integratedRows.reduce((sum, row) => sum + row.model.score * row.spend, 0) / totalIntegratedSpend
      : integratedRows.reduce((sum, row) => sum + row.model.score, 0) / integratedRows.length
  );

  const handleAddCampaign = () => {
    if (!newUrl.trim()) return;

    const spend = Number(newSpend) || 0;
    const nextCampaign: Campaign = {
      id: `c-${Date.now()}`,
      platform: newPlatform,
      productRank: selectedProductRank,
      name: `${selectedProduct.brand} 신규 ${newPlatform} 캠페인`,
      creative: newPlatform === 'Instagram' ? '릴스 소재' : newPlatform === 'YouTube' ? '영상 리뷰' : '전환 광고 소재',
      url: newUrl,
      spend,
      impressions: Math.max(24000, Math.round(spend / 16)),
      clicks: Math.max(780, Math.round(spend / 420)),
      engagements: Math.max(1200, Math.round(spend / 220)),
      startDate: '오늘',
      targetChannel: '올리브영',
    };

    setCampaigns((prev) => [nextCampaign, ...prev]);
    setNewUrl('');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[11px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            선행지표 분석
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">광고를 어디에, 얼마나, 어떻게 집행했는지 봅니다.</h2>
          <p className="mt-3 text-sm font-bold text-gray-500 max-w-3xl">
            YouTube, Instagram, Meta Ads, TikTok 캠페인의 집행 금액과 노출, 클릭, 참여 반응을 함께 추적합니다.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <WalletCards className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">총 집행 금액</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatCurrency(totals.spend)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center mb-4">
            <Eye className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">총 노출</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatNumber(totals.impressions)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">총 클릭</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatNumber(totals.clicks)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">참여율</p>
          <p className="mt-2 text-3xl font-black text-gray-900">
            {totals.impressions ? ((totals.engagements / totals.impressions) * 100).toFixed(1) : '0.0'}%
          </p>
        </div>
      </section>

      <DemandViewTabs activeView={activeDemandView} onViewChange={setActiveDemandView} />

      {activeDemandView === 'dashboard' ? (
        <LeadingIntegratedDashboard rows={integratedRows} overallScore={overallLeadingScore} />
      ) : (
        <PlatformDemandSection model={activeDemandModel ?? getPlatformDemandModel('YouTube')} />
      )}

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-7 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">소재 성과 비교</p>
              <h3 className="mt-2 text-2xl font-black text-gray-900">어떤 소재 형식이 어떤 플랫폼에서 강한지 비교합니다</h3>
              <p className="mt-2 text-sm font-bold text-gray-500">콘텐츠 유형과 플랫폼 반응을 같은 기준으로 비교합니다.</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creativeCompareData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f6ef" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} formatter={(value) => [`${value}%`, '참여율']} />
                <Bar dataKey="youtube" name="YouTube" fill="#111827" radius={[10, 10, 0, 0]} />
                <Bar dataKey="instagram" name="Instagram" fill="#d946ef" radius={[10, 10, 0, 0]} />
                <Bar dataKey="tiktok" name="TikTok" fill="#6dec13" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-5 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-5">콘텐츠 유형별 액션</h3>
          <div className="space-y-3">
            {contentFormatRows.map((row) => (
              <div key={row.format} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-gray-900">{row.format}</p>
                    <p className="mt-1 text-xs font-bold text-gray-500">{row.response} · {row.fit}</p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-[#ecf3e7] text-[10px] font-black text-[#2a4519]">{row.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-[2rem] border border-[#ecf3e7] p-6 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-5">소재 메시지 참고</h3>
          <div className="space-y-3">
            {referenceRows.map((row) => (
              <div key={row.message} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                <p className="text-sm font-black text-gray-900">{row.message}</p>
                <p className="mt-1 text-xs font-bold text-gray-500">{row.hook}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black text-[#6c9a4c]">{row.platform}</span>
                  <span className="text-[10px] font-black text-gray-500">{row.signal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-[#ecf3e7] p-6 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-5">브랜드 언급 모니터</h3>
          <div className="space-y-3">
            {brandMentionRows.map((row) => (
              <div key={row.brand} className="grid grid-cols-[80px_1fr_auto] gap-3 items-center rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                <p className="text-sm font-black text-gray-900">{row.brand}</p>
                <div>
                  <p className="text-sm font-black text-[#2a4519]">{row.mention}</p>
                  <p className="mt-1 text-[11px] font-bold text-gray-500">{row.context}</p>
                </div>
                <span className="text-[10px] font-black text-gray-500">{row.risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-[#ecf3e7] p-6 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-5">크리에이터 후보</h3>
          <div className="space-y-3">
            {creatorCandidateRows.map((row) => (
              <div key={row.name} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-gray-900">{row.name}</p>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-900 text-[#6dec13] text-[10px] font-black">{row.fit}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-gray-500">{row.group} · {row.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2rem] border border-[#ecf3e7] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xl font-black text-gray-900">콘텐츠 보관함</h3>
            <p className="mt-1 text-sm font-bold text-gray-500">참고 콘텐츠, 크리에이터, 다음 소재 후보를 캠페인 실행 항목으로 관리합니다.</p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">{savedContentRows.length}개 저장</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedContentRows.map((row) => (
            <div key={row.title} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
              <p className="text-sm font-black text-gray-900">{row.title}</p>
              <p className="mt-2 text-xs font-bold text-gray-500">{row.owner}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ecf3e7] text-[10px] font-black text-[#6c9a4c]">{row.tag}</span>
                <span className="text-[10px] font-black text-gray-500">{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6dec13]" />
              캠페인 추가
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as Platform)}
                  className="h-12 bg-gray-50 border-none rounded-xl px-3 text-xs font-black focus:ring-2 focus:ring-[#6dec13]/50"
                >
                  {LEADING_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <input
                  value={newSpend}
                  onChange={(e) => setNewSpend(e.target.value)}
                  type="number"
                  className="h-12 bg-gray-50 border-none rounded-xl px-3 text-xs font-black focus:ring-2 focus:ring-[#6dec13]/50"
                  placeholder="집행 금액"
                />
              </div>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="광고 소재 URL"
                className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#6dec13] outline-none transition-all"
              />
              <button
                onClick={handleAddCampaign}
                disabled={!newUrl.trim()}
                className="w-full h-14 bg-gray-900 text-[#6dec13] font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                선행 데이터 등록
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6">채널 필터</h3>
            <div className="grid grid-cols-1 gap-2">
              {(['전체', ...LEADING_PLATFORMS] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black transition-all ${
                    activePlatform === platform ? 'bg-[#6dec13] text-gray-900' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {platform === '전체' ? <Radio className="w-4 h-4" /> : platformIcons[platform]}
                    {platform}
                  </span>
                  <span className="text-[10px]">
                    {platform === '전체' ? allForProduct.length : allForProduct.filter((campaign) => campaign.platform === platform).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900">집행 추이</h3>
                <p className="mt-1 text-sm font-bold text-gray-400">광고비와 클릭 흐름을 같은 기간으로 봅니다.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-[#6c9a4c] bg-[#6dec13]/10 rounded-xl px-3 py-2">
                <Calendar className="w-4 h-4" />
                최근 7일
              </div>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="leadingSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6dec13" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6dec13" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f6ef" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
                  <Area type="monotone" dataKey="spend" name="광고비(만원)" stroke="#6dec13" strokeWidth={4} fill="url(#leadingSpend)" />
                  <Area type="monotone" dataKey="clicks" name="클릭(천건)" stroke="#111827" strokeWidth={3} fill="transparent" strokeDasharray="7 6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-6">채널별 집행 금액</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f6ef" />
                    <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
                    <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
                    <Bar dataKey="spend" name="집행 금액(만원)" fill="#6dec13" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl text-white">
              <h3 className="text-xl font-black mb-5">판매 채널 확인 포인트</h3>
              <div className="space-y-4">
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">강한 선행 신호</p>
                  <p className="mt-2 text-lg font-black text-[#6dec13]">YouTube 클릭률 4.3%</p>
                  <p className="mt-2 text-xs font-bold text-gray-400 leading-relaxed">
                    판매 채널 반응이 2-3일 뒤 따라오는지 후행지표에서 확인하세요.
                  </p>
                </div>
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">점검 신호</p>
                  <p className="mt-2 text-lg font-black text-orange-300">Meta Ads 클릭 비용 상승</p>
                  <p className="mt-2 text-xs font-bold text-gray-400 leading-relaxed">
                    판매 채널 반응이 같이 오르지 않으면 상세 페이지 또는 소재를 점검해야 합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[#ecf3e7]">
          <h3 className="text-2xl font-black text-gray-900">캠페인 목록</h3>
          <p className="mt-1 text-sm font-bold text-gray-400">집행 내역을 상품과 판매 채널에 연결할 수 있게 정리합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-6">
          {filteredCampaigns.map((campaign) => {
            const campaignDemandModel = getPlatformDemandModel(campaign.platform);
            const campaignBand = getDemandSignalBand(campaignDemandModel.score);

            return (
              <div key={campaign.id} className="border border-[#ecf3e7] rounded-2xl overflow-hidden bg-[#f7f8f6]">
                <div className="p-5 bg-white border-b border-[#ecf3e7]">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 text-[#6dec13] rounded-lg text-[10px] font-black">
                      {platformIcons[campaign.platform]}
                      {campaign.platform}
                    </span>
                    <span className="text-[10px] font-black text-gray-400">{campaign.startDate}</span>
                  </div>
                  <h4 className="font-black text-gray-900 line-clamp-2 min-h-[44px]">{campaign.name}</h4>
                  <p className="mt-2 text-xs font-bold text-gray-400">{campaign.creative}</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">수요 신호</p>
                        <p className="mt-1 text-lg font-black text-gray-900">{campaignDemandModel.score}점</p>
                      </div>
                      <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black ${demandToneClass[campaignBand.tone]}`}>
                        {campaignBand.label}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-bold leading-relaxed text-gray-500">{campaignDemandModel.scoreName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-black text-gray-400">광고비</p>
                      <p className="font-black text-gray-900">{formatCurrency(campaign.spend)}</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-400">클릭</p>
                      <p className="font-black text-gray-900">{formatNumber(campaign.clicks)}</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-400">CTR</p>
                      <p className="font-black text-gray-900">{((campaign.clicks / campaign.impressions) * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-400">연결 채널</p>
                      <p className="font-black text-gray-900">{campaign.targetChannel}</p>
                    </div>
                  </div>
                  <a href={campaign.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:underline">
                    콘텐츠 열기 <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}

          {filteredCampaigns.length === 0 && (
            <div className="md:col-span-2 xl:col-span-4 py-16 text-center text-gray-400 font-black">
              표시할 선행 광고 데이터가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdAnalyticsView;
