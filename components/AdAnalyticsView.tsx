import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Eye,
  Instagram,
  MousePointerClick,
  Plus,
  Radio,
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
import OliveYoungCommercePanel from '../features/commerce/oliveyoung/components/OliveYoungCommercePanel';
import { mediaFeatureCards } from '../brandDashPlan';
import type { FeaturePageId } from '../brandDashPlan';

type Platform = 'YouTube' | 'Instagram' | 'Meta Ads' | 'TikTok';

interface AdAnalyticsViewProps {
  onFeatureOpen: (featureId: FeaturePageId) => void;
}

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

const platformIcons: Record<Platform, React.ReactNode> = {
  YouTube: <Youtube className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
  'Meta Ads': <Radio className="w-4 h-4" />,
  TikTok: <Video className="w-4 h-4" />,
};

const initialCampaigns: Campaign[] = [
  {
    id: 'c-yt-1',
    platform: 'YouTube',
    productRank: 1,
    name: '메디힐 7일 사용 리뷰',
    creative: '롱폼 리뷰 영상',
    url: 'https://www.youtube.com/watch?v=sample1',
    spend: 7800000,
    impressions: 428000,
    clicks: 18240,
    engagements: 12450,
    startDate: '01.08',
    targetChannel: '올리브영',
  },
  {
    id: 'c-ig-1',
    platform: 'Instagram',
    productRank: 2,
    name: '에스트라 크림 릴스 캠페인',
    creative: '릴스 체험단',
    url: 'https://www.instagram.com/reel/sample',
    spend: 4200000,
    impressions: 318000,
    clicks: 11620,
    engagements: 22100,
    startDate: '01.10',
    targetChannel: '쿠팡',
  },
  {
    id: 'c-meta-1',
    platform: 'Meta Ads',
    productRank: 6,
    name: '메디큐브 리타겟팅',
    creative: '전환 최적화 배너',
    url: 'https://ads.example.com/meta',
    spend: 3600000,
    impressions: 226000,
    clicks: 8840,
    engagements: 6120,
    startDate: '01.12',
    targetChannel: '네이버',
  },
  {
    id: 'c-tt-1',
    platform: 'TikTok',
    productRank: 7,
    name: '달바 미스트 숏폼',
    creative: '15초 사용감 영상',
    url: 'https://www.tiktok.com/@sample/video/1',
    spend: 2800000,
    impressions: 372000,
    clicks: 9540,
    engagements: 18300,
    startDate: '01.14',
    targetChannel: '올리브영',
  },
];

const trendData = [
  { day: '01.08', spend: 210, impressions: 58, clicks: 2.1 },
  { day: '01.09', spend: 260, impressions: 72, clicks: 2.8 },
  { day: '01.10', spend: 340, impressions: 96, clicks: 3.9 },
  { day: '01.11', spend: 310, impressions: 88, clicks: 3.4 },
  { day: '01.12', spend: 420, impressions: 118, clicks: 4.6 },
  { day: '01.13', spend: 510, impressions: 142, clicks: 5.8 },
  { day: '01.14', spend: 560, impressions: 168, clicks: 6.2 },
];

function formatCurrency(value: number) {
  if (value >= 1000000) return `₩${(value / 1000000).toFixed(1)}M`;
  return `₩${Math.round(value / 10000)}만`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

const AdAnalyticsView: React.FC<AdAnalyticsViewProps> = ({ onFeatureOpen }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [activePlatform, setActivePlatform] = useState<Platform | '전체'>('전체');
  const [selectedProductRank, setSelectedProductRank] = useState(MOCK_PRODUCTS[0].rank);
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

  const totals = allForProduct.reduce(
    (acc, campaign) => ({
      spend: acc.spend + campaign.spend,
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      engagements: acc.engagements + campaign.engagements,
    }),
    { spend: 0, impressions: 0, clicks: 0, engagements: 0 }
  );

  const platformData = (['YouTube', 'Instagram', 'Meta Ads', 'TikTok'] as Platform[]).map((platform) => {
    const platformCampaigns = allForProduct.filter((campaign) => campaign.platform === platform);
    return {
      platform,
      spend: platformCampaigns.reduce((sum, campaign) => sum + campaign.spend / 10000, 0),
      clicks: platformCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0),
    };
  });

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
            선행지표 분석관
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">광고를 어디에, 얼마나, 어떻게 집행했는지 봅니다.</h2>
          <p className="mt-3 text-sm font-bold text-gray-500 max-w-3xl">
            YouTube, Instagram, Meta Ads, TikTok 캠페인의 집행 금액과 노출, 클릭, 참여 신호를 상품 단위로 추적합니다.
          </p>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-[#ecf3e7] shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">분석 상품</span>
          <select
            value={selectedProductRank}
            onChange={(e) => setSelectedProductRank(Number(e.target.value))}
            className="bg-gray-50 border-none rounded-xl text-sm font-black px-4 py-2 focus:ring-2 focus:ring-[#6dec13]/50 outline-none min-w-[260px]"
          >
            {MOCK_PRODUCTS.slice(0, 10).map((product) => (
              <option key={product.rank} value={product.rank}>
                #{product.rank} {product.name}
              </option>
            ))}
          </select>
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

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">Leading Feature Pages</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">선행지표 기능 페이지</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              콘텐츠 탐색, 키워드 레퍼런스, 크리에이터 분석처럼 실제 업무 단위로 들어가서 볼 수 있습니다.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">미디어 기능 01-07</span>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mediaFeatureCards.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onFeatureOpen(feature.id)}
              className="group text-left rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-5 hover:bg-[#6dec13]/10 hover:border-[#6dec13]/60 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ecf3e7] text-[10px] font-black text-[#6c9a4c]">
                  {feature.sourceRows}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </div>
              <h4 className="text-lg font-black text-gray-900">{feature.title}</h4>
              <p className="mt-2 text-xs font-bold text-gray-500 leading-relaxed">{feature.description}</p>
            </button>
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
                  {(['YouTube', 'Instagram', 'Meta Ads', 'TikTok'] as Platform[]).map((platform) => (
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
              {(['전체', 'YouTube', 'Instagram', 'Meta Ads', 'TikTok'] as const).map((platform) => (
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
              <h3 className="text-xl font-black mb-5">후행지표 연결 힌트</h3>
              <div className="space-y-4">
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">강한 선행 신호</p>
                  <p className="mt-2 text-lg font-black text-[#6dec13]">YouTube 클릭률 4.3%</p>
                  <p className="mt-2 text-xs font-bold text-gray-400 leading-relaxed">
                    올리브영 구매 반응이 2-3일 뒤 따라오는지 후행지표 분석관에서 확인하세요.
                  </p>
                </div>
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">위험 신호</p>
                  <p className="mt-2 text-lg font-black text-orange-300">Meta Ads 클릭 비용 상승</p>
                  <p className="mt-2 text-xs font-bold text-gray-400 leading-relaxed">
                    네이버 커머스 반응이 같이 오르지 않으면 랜딩 또는 소재를 점검해야 합니다.
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
          {filteredCampaigns.map((campaign) => (
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
                    <p className="font-black text-gray-400">목표 채널</p>
                    <p className="font-black text-gray-900">{campaign.targetChannel}</p>
                  </div>
                </div>
                <a href={campaign.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:underline">
                  소재 보기 <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {filteredCampaigns.length === 0 && (
            <div className="md:col-span-2 xl:col-span-4 py-16 text-center text-gray-400 font-black">
              선택한 조건에 맞는 선행 광고 데이터가 없습니다.
            </div>
          )}
        </div>
      </section>

      <OliveYoungCommercePanel campaignId="campaign-youtube-01" productId={`product-${selectedProductRank}`} />

      <details className="group bg-white rounded-[2rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">선행지표 기획 상세</h3>
            <p className="mt-1 text-sm font-bold text-gray-400">광고 집행 이후 확인할 기능 화면</p>
          </div>
          <span className="px-3 py-2 rounded-xl bg-[#f7f8f6] text-xs font-black text-[#6c9a4c] group-open:bg-[#6dec13] group-open:text-gray-900">
            펼치기
          </span>
        </summary>

        <div className="px-6 pb-6 space-y-6">
          <section className="bg-[#f7f8f6] rounded-[2rem] border border-[#ecf3e7] p-6">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-7">
              <div>
                <h3 className="text-2xl font-black text-gray-900">미디어 핵심 기능</h3>
                <p className="mt-1 text-sm font-bold text-gray-400">광고 소재와 채널 반응을 확인하는 기능</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">YouTube · Instagram · TikTok · X 확장 가능</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mediaFeatureCards.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => onFeatureOpen(feature.id)}
                  className="group text-left rounded-2xl border border-[#ecf3e7] bg-white p-5 hover:bg-[#6dec13]/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-black text-gray-900">{feature.title}</h4>
                    <span className="px-2 py-1 rounded-lg bg-[#f7f8f6] text-[9px] font-black text-[#6c9a4c] border border-[#ecf3e7]">{feature.sourceRows}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-black text-[#6c9a4c]">
                    페이지 보기 <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </details>
    </div>
  );
};

export default AdAnalyticsView;
