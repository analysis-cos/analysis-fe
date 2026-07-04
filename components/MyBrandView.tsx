import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  CreditCard,
  ExternalLink,
  Instagram,
  Link2,
  Megaphone,
  MousePointerClick,
  Package,
  Plus,
  Radio,
  Search,
  ShoppingBag,
  Store,
  Trash2,
  TrendingUp,
  Video,
  Youtube,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { commerceFeatureCards, reportTemplates } from '../brandDashPlan';
import type { FeaturePageId } from '../brandDashPlan';

interface MyBrandViewProps {
  onProductClick: (product: Product) => void;
  onFeatureOpen: (featureId: FeaturePageId) => void;
}

type SalesChannel = '전체' | '올리브영' | '쿠팡' | '네이버';
type AdPlatform = 'YouTube' | 'Instagram' | 'Meta Ads' | 'TikTok' | 'X';

interface AdTimingEvent {
  id: string;
  day: string;
  platform: AdPlatform;
  name: string;
  url: string;
}

const adPlatforms: AdPlatform[] = ['YouTube', 'Instagram', 'Meta Ads', 'TikTok', 'X'];

const adPlatformMeta: Record<AdPlatform, { color: string; bg: string; icon: React.ReactNode }> = {
  YouTube: { color: '#ef4444', bg: 'bg-red-50 text-red-600', icon: <Youtube className="w-3.5 h-3.5" /> },
  Instagram: { color: '#d946ef', bg: 'bg-fuchsia-50 text-fuchsia-600', icon: <Instagram className="w-3.5 h-3.5" /> },
  'Meta Ads': { color: '#2563eb', bg: 'bg-blue-50 text-blue-600', icon: <Radio className="w-3.5 h-3.5" /> },
  TikTok: { color: '#111827', bg: 'bg-gray-100 text-gray-900', icon: <Video className="w-3.5 h-3.5" /> },
  X: { color: '#64748b', bg: 'bg-slate-100 text-slate-600', icon: <Megaphone className="w-3.5 h-3.5" /> },
};

const channelPerformance = [
  { channel: '올리브영', visits: 58200, purchases: 1840, revenue: 62800000, roas: 421, conversionRate: 3.16 },
  { channel: '쿠팡', visits: 41600, purchases: 1128, revenue: 39100000, roas: 362, conversionRate: 2.71 },
  { channel: '네이버', visits: 35400, purchases: 846, revenue: 28700000, roas: 298, conversionRate: 2.39 },
];

const conversionTrend = [
  { day: '01.08', oliveyoung: 210, coupang: 124, naver: 96 },
  { day: '01.09', oliveyoung: 260, coupang: 142, naver: 112 },
  { day: '01.10', oliveyoung: 318, coupang: 198, naver: 146 },
  { day: '01.11', oliveyoung: 292, coupang: 176, naver: 132 },
  { day: '01.12', oliveyoung: 376, coupang: 214, naver: 168 },
  { day: '01.13', oliveyoung: 448, coupang: 268, naver: 196 },
  { day: '01.14', oliveyoung: 502, coupang: 306, naver: 224 },
];

const initialAdTimingEvents: AdTimingEvent[] = [
  {
    id: 'ad-event-youtube-01',
    day: '01.08',
    platform: 'YouTube',
    name: '메디힐 7일 사용 리뷰',
    url: 'https://www.youtube.com/watch?v=sample1',
  },
  {
    id: 'ad-event-instagram-01',
    day: '01.10',
    platform: 'Instagram',
    name: '에스트라 크림 릴스',
    url: 'https://www.instagram.com/reel/sample',
  },
  {
    id: 'ad-event-meta-01',
    day: '01.12',
    platform: 'Meta Ads',
    name: '메디큐브 리타겟팅',
    url: 'https://ads.example.com/meta',
  },
];

const productResults = MOCK_PRODUCTS.slice(0, 8).map((product, index) => {
  const channel = ['올리브영', '쿠팡', '네이버', '올리브영', '쿠팡', '네이버', '올리브영', '쿠팡'][index] as Exclude<SalesChannel, '전체'>;
  const visits = [12840, 9340, 7820, 11280, 8840, 6940, 10320, 7560][index];
  const purchases = [462, 284, 198, 388, 246, 176, 332, 204][index];
  const revenue = purchases * product.price;
  const sourceCampaign = ['YouTube 리뷰', 'Instagram 릴스', 'Meta Ads', 'TikTok 숏폼'][index % 4];

  return {
    product,
    channel,
    visits,
    purchases,
    revenue,
    conversionRate: (purchases / visits) * 100,
    sourceCampaign,
    rankChange: [6, 3, -2, 5, 1, -1, 4, 2][index],
  };
});

function formatCurrency(value: number) {
  if (value >= 100000000) return `₩${(value / 100000000).toFixed(1)}억`;
  if (value >= 10000) return `₩${Math.round(value / 10000).toLocaleString('ko-KR')}만`;
  return `₩${value.toLocaleString('ko-KR')}`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

const MyBrandView: React.FC<MyBrandViewProps> = ({ onProductClick, onFeatureOpen }) => {
  const [activeChannel, setActiveChannel] = useState<SalesChannel>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [adTimingEvents, setAdTimingEvents] = useState<AdTimingEvent[]>(initialAdTimingEvents);
  const [newAdDay, setNewAdDay] = useState(conversionTrend[conversionTrend.length - 1]?.day ?? '01.14');
  const [newAdPlatform, setNewAdPlatform] = useState<AdPlatform>('YouTube');
  const [newAdName, setNewAdName] = useState('');
  const [newAdUrl, setNewAdUrl] = useState('');

  const filteredResults = useMemo(() => {
    return productResults.filter(({ product, channel }) => {
      const channelMatched = activeChannel === '전체' || activeChannel === channel;
      const keyword = searchTerm.trim().toLowerCase();
      const searchMatched =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword);

      return channelMatched && searchMatched;
    });
  }, [activeChannel, searchTerm]);

  const totals = filteredResults.reduce(
    (acc, item) => ({
      visits: acc.visits + item.visits,
      purchases: acc.purchases + item.purchases,
      revenue: acc.revenue + item.revenue,
    }),
    { visits: 0, purchases: 0, revenue: 0 }
  );

  const avgConversion = totals.visits ? (totals.purchases / totals.visits) * 100 : 0;
  const avgRoas = activeChannel === '전체'
    ? Math.round(channelPerformance.reduce((sum, item) => sum + item.roas, 0) / channelPerformance.length)
    : channelPerformance.find((item) => item.channel === activeChannel)?.roas ?? 0;

  const eventsByDay = useMemo(() => {
    return adTimingEvents.reduce<Record<string, AdTimingEvent[]>>((acc, event) => {
      acc[event.day] = [...(acc[event.day] ?? []), event];
      return acc;
    }, {});
  }, [adTimingEvents]);

  const sortedAdTimingEvents = useMemo(() => {
    const dayOrder = conversionTrend.reduce<Record<string, number>>((acc, item, index) => {
      acc[item.day] = index;
      return acc;
    }, {});

    return [...adTimingEvents].sort((a, b) => (dayOrder[a.day] ?? 999) - (dayOrder[b.day] ?? 999));
  }, [adTimingEvents]);

  const handleAddAdTimingEvent = () => {
    const trimmedName = newAdName.trim();
    const trimmedUrl = newAdUrl.trim();

    if (!trimmedName || !trimmedUrl) return;

    setAdTimingEvents((prev) => [
      ...prev,
      {
        id: `ad-event-${Date.now()}`,
        day: newAdDay,
        platform: newAdPlatform,
        name: trimmedName,
        url: trimmedUrl,
      },
    ]);
    setNewAdName('');
    setNewAdUrl('');
  };

  const handleRemoveAdTimingEvent = (eventId: string) => {
    setAdTimingEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6dec13]/15 text-[#2a4519] rounded-full text-[11px] font-black uppercase tracking-widest mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            후행지표 분석관
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">광고가 실제 구매로 이어졌는지 확인합니다.</h2>
          <p className="mt-3 text-sm font-bold text-gray-500 max-w-3xl">
            네이버, 쿠팡, 올리브영의 방문, 구매, 매출, 전환율을 상품 단위로 비교해서 광고 성과의 결과를 판단합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-[#ecf3e7] rounded-2xl p-2 shadow-sm">
          {(['전체', '올리브영', '쿠팡', '네이버'] as SalesChannel[]).map((channel) => (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeChannel === channel ? 'bg-[#6dec13] text-gray-900 shadow-lg shadow-[#6dec13]/20' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">방문수</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatNumber(totals.visits)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center mb-4">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">구매수</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatNumber(totals.purchases)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <CreditCard className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">매출</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{formatCurrency(totals.revenue)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">전환율 / ROAS</p>
          <p className="mt-2 text-3xl font-black text-gray-900">{avgConversion.toFixed(1)}%</p>
          <p className="mt-1 text-xs font-black text-[#6c9a4c]">ROAS {avgRoas}%</p>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">Lagging Feature Pages</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">후행지표 기능 페이지</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              판매 채널 랭킹, 상품 비교, 라이징 탐지, 리뷰 반응 분석을 기능 단위로 자세히 볼 수 있습니다.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">커머스 기능 01-06</span>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {commerceFeatureCards.map((feature) => (
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
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">판매 채널별 구매 반응 추이</h3>
              <p className="mt-1 text-sm font-bold text-gray-400">광고가 들어간 시점과 이후 채널 반응이 따라오는 구간을 함께 봅니다.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#f7f8f6] rounded-xl text-xs font-black text-[#6c9a4c]">
              <BarChart3 className="w-4 h-4" />
              최근 7일
            </div>
          </div>

          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f6ef" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
                {sortedAdTimingEvents.map((event) => (
                  <ReferenceLine
                    key={event.id}
                    x={event.day}
                    stroke={adPlatformMeta[event.platform].color}
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: event.platform,
                      position: 'top',
                      fill: adPlatformMeta[event.platform].color,
                      fontSize: 10,
                      fontWeight: 900,
                    }}
                  />
                ))}
                <Line type="monotone" dataKey="oliveyoung" name="올리브영" stroke="#6dec13" strokeWidth={4} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="coupang" name="쿠팡" stroke="#111827" strokeWidth={3} strokeDasharray="7 6" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="naver" name="네이버" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-gray-900">차트에 표시된 광고 시점</h4>
                <p className="mt-1 text-xs font-bold text-gray-500">세로 점선은 선행지표 플랫폼에서 집행한 광고 또는 콘텐츠 업로드 시점입니다.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">{adTimingEvents.length}개 이벤트</span>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {sortedAdTimingEvents.map((event) => (
                <a
                  key={event.id}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[220px] rounded-2xl bg-white border border-[#ecf3e7] p-4 hover:border-[#6dec13] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black ${adPlatformMeta[event.platform].bg}`}>
                      {adPlatformMeta[event.platform].icon}
                      {event.platform}
                    </span>
                    <span className="text-[10px] font-black text-gray-400">{event.day}</span>
                  </div>
                  <p className="mt-3 text-sm font-black text-gray-900 line-clamp-2">{event.name}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-black text-blue-600">
                    URL 보기 <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-gray-900 text-[#6dec13] rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">광고 시점 등록</h3>
              <p className="text-xs font-bold text-gray-400">선행 플랫폼 광고를 차트에 표시합니다.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">날짜</span>
                <select
                  value={newAdDay}
                  onChange={(event) => setNewAdDay(event.target.value)}
                  className="mt-2 w-full h-11 rounded-xl bg-[#f7f8f6] border-none px-3 text-xs font-black text-gray-700 focus:ring-2 focus:ring-[#6dec13]/50"
                >
                  {conversionTrend.map((item) => (
                    <option key={item.day} value={item.day}>{item.day}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">플랫폼</span>
                <select
                  value={newAdPlatform}
                  onChange={(event) => setNewAdPlatform(event.target.value as AdPlatform)}
                  className="mt-2 w-full h-11 rounded-xl bg-[#f7f8f6] border-none px-3 text-xs font-black text-gray-700 focus:ring-2 focus:ring-[#6dec13]/50"
                >
                  {adPlatforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">광고명</span>
              <input
                value={newAdName}
                onChange={(event) => setNewAdName(event.target.value)}
                placeholder="예: 선크림 릴스 캠페인"
                className="mt-2 w-full h-11 rounded-xl bg-[#f7f8f6] border-none px-4 text-sm font-bold text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-[#6dec13]/50"
              />
            </label>

            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">URL</span>
              <div className="mt-2 relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c9a4c]" />
                <input
                  type="url"
                  value={newAdUrl}
                  onChange={(event) => setNewAdUrl(event.target.value)}
                  placeholder="https://..."
                  className="w-full h-11 rounded-xl bg-[#f7f8f6] border-none pl-10 pr-4 text-sm font-bold text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-[#6dec13]/50"
                />
              </div>
            </label>

            <button
              onClick={handleAddAdTimingEvent}
              disabled={!newAdName.trim() || !newAdUrl.trim()}
              className="w-full h-12 rounded-2xl bg-gray-900 text-[#6dec13] text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              광고 시점 추가
            </button>
          </div>

          <div className="mt-7 pt-6 border-t border-[#ecf3e7]">
            <h4 className="text-sm font-black text-gray-900 mb-3">등록된 광고</h4>
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {sortedAdTimingEvents.map((event) => {
                const eventsOnDay = eventsByDay[event.day]?.length ?? 0;

                return (
                  <div key={event.id} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black ${adPlatformMeta[event.platform].bg}`}>
                            {adPlatformMeta[event.platform].icon}
                            {event.platform}
                          </span>
                          <span className="text-[10px] font-black text-gray-400">{event.day}</span>
                        </div>
                        <p className="mt-2 text-sm font-black text-gray-900 line-clamp-2">{event.name}</p>
                        {eventsOnDay > 1 && (
                          <p className="mt-1 text-[10px] font-black text-orange-500">같은 날짜 광고 {eventsOnDay}개</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveAdTimingEvent(event.id)}
                        className="w-8 h-8 rounded-xl bg-white border border-[#ecf3e7] text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        aria-label={`${event.name} 광고 시점 삭제`}
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-black text-blue-600 hover:underline"
                    >
                      URL 열기 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-gray-900 text-[#6dec13] rounded-xl flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">채널별 ROAS</h3>
            <p className="text-xs font-bold text-gray-400">광고비 대비 매출</p>
          </div>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelPerformance} layout="vertical" margin={{ left: 12, right: 8 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#374151' }} width={70} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
              <Bar dataKey="roas" name="ROAS" fill="#6dec13" radius={[0, 12, 12, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div>
            <h3 className="text-2xl font-black text-gray-900">상품별 후행 성과</h3>
            <p className="mt-1 text-sm font-bold text-gray-400">광고 유입이 실제 판매 채널에서 구매로 전환됐는지 확인합니다.</p>
          </div>
          <div className="relative min-w-full xl:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c9a4c]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="상품명 또는 브랜드 검색"
              className="w-full h-12 pl-11 pr-4 bg-[#f7f8f6] border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#6dec13]/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f7f8f6]">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">상품</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">판매 채널</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">방문 / 구매</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">전환율</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">매출</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c] text-right">광고 연결</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecf3e7]">
              {filteredResults.map((item) => (
                <tr key={`${item.product.rank}-${item.channel}`} className="hover:bg-[#6dec13]/5 cursor-pointer" onClick={() => onProductClick(item.product)}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
                      <div>
                        <p className="font-black text-gray-900 line-clamp-1 max-w-[360px]">{item.product.name}</p>
                        <p className="text-[11px] font-bold text-gray-400">{item.product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex px-3 py-1.5 bg-[#6dec13]/15 text-[#2a4519] rounded-xl text-xs font-black">{item.channel}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-600">
                    {formatNumber(item.visits)} / {formatNumber(item.purchases)}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#6dec13]" style={{ width: `${Math.min(100, item.conversionRate * 18)}%` }}></div>
                      </div>
                      <span className="text-sm font-black text-gray-900">{item.conversionRate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-gray-900">{formatCurrency(item.revenue)}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="text-xs font-black text-gray-500">{item.sourceCampaign}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black ${
                        item.rankChange >= 0 ? 'bg-[#6dec13]/15 text-[#2a4519]' : 'bg-red-50 text-red-500'
                      }`}>
                        <ArrowUpRight className="w-3 h-3" />
                        {item.rankChange >= 0 ? `+${item.rankChange}` : item.rankChange}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-400 font-black">
                      <Package className="w-10 h-10" />
                      조건에 맞는 후행 성과 데이터가 없습니다.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <details className="group bg-white rounded-[2rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">후행지표 기획 상세</h3>
            <p className="mt-1 text-sm font-bold text-gray-400">커머스 기능과 리포트 자동화</p>
          </div>
          <span className="px-3 py-2 rounded-xl bg-[#f7f8f6] text-xs font-black text-[#6c9a4c] group-open:bg-[#6dec13] group-open:text-gray-900">
            펼치기
          </span>
        </summary>

        <div className="px-6 pb-6 space-y-6">
          <section className="bg-[#f7f8f6] rounded-[2rem] border border-[#ecf3e7] p-6">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-7">
              <div>
                <h3 className="text-2xl font-black text-gray-900">커머스 핵심 기능</h3>
                <p className="mt-1 text-sm font-bold text-gray-400">랭킹, 상품 비교, 리뷰 반응 분석</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">네이버 · 쿠팡 · 올리브영 · 무신사 확장 가능</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {commerceFeatureCards.map((feature) => (
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

          <section className="bg-gray-900 rounded-[2rem] p-6 shadow-2xl text-white">
            <h3 className="text-xl font-black mb-5">후행 리포트 자동화</h3>
            <div className="flex flex-wrap gap-2">
              {reportTemplates.filter((template) => template.includes('랭킹') || template.includes('상품') || template.includes('급상승')).map((template) => (
                <span key={template} className="px-3 py-2 rounded-xl bg-white/8 border border-white/10 text-[#6dec13] text-xs font-black">
                  {template}
                </span>
              ))}
            </div>
          </section>
        </div>
      </details>
    </div>
  );
};

export default MyBrandView;
