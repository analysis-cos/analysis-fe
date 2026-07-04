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

interface MyBrandViewProps {
  selectedProductRank: number;
  onProductClick: (product: Product) => void;
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

const productResults = MOCK_PRODUCTS.slice(0, 10).flatMap((product, productIndex) => {
  const channels: Array<Exclude<SalesChannel, '전체'>> = ['올리브영', '쿠팡', '네이버'];

  return channels.map((channel, channelIndex) => {
    const visits = [12840, 9340, 7820][channelIndex] + productIndex * 420;
    const purchases = [462, 284, 198][channelIndex] + productIndex * 18;
    const revenue = purchases * product.price;
    const sourceCampaign = ['YouTube 리뷰', 'Instagram 릴스', 'Meta Ads'][channelIndex];

    return {
      product,
      channel,
      visits,
      purchases,
      revenue,
      conversionRate: (purchases / visits) * 100,
      sourceCampaign,
      rankChange: [6, 3, -2][channelIndex] + (product.change > 0 ? 1 : 0),
    };
  });
});

function buildCommerceRankingRows(product: Product) {
  return [
    {
      channel: '올리브영',
      product: product.name,
      rank: `${product.rank}위`,
      delta: product.change > 0 ? `${product.change}위 상승` : product.change < 0 ? `${Math.abs(product.change)}위 하락` : '변화 없음',
      purchase: '1,184건',
      confounder: '할인 변화 확인 필요',
      action: '광고 시점과 랭킹 변화 비교',
    },
    {
      channel: '쿠팡',
      product: product.name,
      rank: '카테고리 7위',
      delta: '8위 상승',
      purchase: '694건',
      confounder: '채널 혜택 동시 진행',
      action: '혜택 영향 분리',
    },
    {
      channel: '네이버',
      product: product.name,
      rank: '검색 11위',
      delta: '2위 하락',
      purchase: '518건',
      confounder: '상품 상세 유입 점검',
      action: '상세 페이지 확인',
    },
  ];
}

function buildLeadingProductRows(product: Product) {
  return [
    {
      product: '상위 평균',
      price: '₩31,900',
      discount: '22%',
      review: '8,420개',
      rating: '4.7',
      benefit: '쿠폰·증정 보통',
    },
    {
      product: '선택 상품',
      price: formatCurrency(product.price),
      discount: product.change > 0 ? '18%' : '데이터 없음',
      review: '6,210개',
      rating: '4.6',
      benefit: '오늘드림·증정 확인',
    },
    {
      product: '경쟁 상품',
      price: '₩25,900',
      discount: '33%',
      review: '11,830개',
      rating: '4.7',
      benefit: '쿠폰 강함',
    },
  ];
}

function buildRisingProductRows(product: Product) {
  return [
    { product: product.name, channel: '올리브영', signal: `${product.rank}위`, reason: '광고 시점 이후 랭킹 변화 확인', action: 'D+3 재확인' },
    { product: product.name, channel: '쿠팡', signal: '구매 반응 +18%', reason: '가격 혜택 강화 가능성', action: '혜택 영향 분리' },
    { product: product.name, channel: '네이버', signal: '검색 랭킹 +6', reason: '리뷰 수와 평점 동반 유지', action: '소재 확장 후보' },
  ];
}

const reviewReactionRows = [
  { label: '신규 리뷰', value: '+312개', detail: '평점 4.7 유지', action: '소재 소구 유지' },
  { label: '평점 리스크', value: '4.8 → 4.4', detail: '눈시림 언급 증가', action: '상세 문구 점검' },
  { label: '재구매 언급', value: '+14%', detail: '대용량 옵션 문의 증가', action: '세트 구성 검토' },
];

const competitorGapRows = [
  { topic: '가격 경쟁력', owned: '₩28,400', competitor: '₩25,900', gap: '경쟁 A가 낮음' },
  { topic: '리뷰 기반 신뢰', owned: '6,210개', competitor: '11,830개', gap: '리뷰 수 보강 필요' },
  { topic: '배송 편의', owned: '오늘드림', competitor: '로켓배송', gap: '채널별 장점 분리' },
];

function formatCurrency(value: number) {
  if (value >= 100000000) return `₩${(value / 100000000).toFixed(1)}억`;
  if (value >= 10000) return `₩${Math.round(value / 10000).toLocaleString('ko-KR')}만`;
  return `₩${value.toLocaleString('ko-KR')}`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

const MyBrandView: React.FC<MyBrandViewProps> = ({ selectedProductRank, onProductClick }) => {
  const [activeChannel, setActiveChannel] = useState<SalesChannel>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [adTimingEvents, setAdTimingEvents] = useState<AdTimingEvent[]>(initialAdTimingEvents);
  const [newAdDay, setNewAdDay] = useState(conversionTrend[conversionTrend.length - 1]?.day ?? '01.14');
  const [newAdPlatform, setNewAdPlatform] = useState<AdPlatform>('YouTube');
  const [newAdName, setNewAdName] = useState('');
  const [newAdUrl, setNewAdUrl] = useState('');
  const selectedProduct = MOCK_PRODUCTS.find((product) => product.rank === selectedProductRank) ?? MOCK_PRODUCTS[0];
  const commerceRankingRows = buildCommerceRankingRows(selectedProduct);
  const leadingProductRows = buildLeadingProductRows(selectedProduct);
  const risingProductRows = buildRisingProductRows(selectedProduct);

  const filteredResults = useMemo(() => {
    return productResults.filter(({ product, channel }) => {
      const productMatched = product.rank === selectedProductRank;
      const channelMatched = activeChannel === '전체' || activeChannel === channel;
      const keyword = searchTerm.trim().toLowerCase();
      const searchMatched =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword);

      return productMatched && channelMatched && searchMatched;
    });
  }, [activeChannel, searchTerm, selectedProductRank]);

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
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">광고 이후 판매 채널 반응을 확인합니다.</h2>
          <p className="mt-3 text-sm font-bold text-gray-500 max-w-3xl">
            네이버, 쿠팡, 올리브영의 방문, 구매, 매출, 전환율을 상품 단위로 비교하고 광고 시점과 함께 해석합니다.
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
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">판매 채널 분석</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">선택 상품의 랭킹, 가격, 리뷰 반응을 확인합니다</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              판매 채널에서 확인해야 하는 랭킹 변화, 가격 조건, 리뷰 반응, 혜택 변수를 함께 봅니다.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">올리브영 · 쿠팡 · 네이버</span>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] overflow-hidden">
            <div className="p-5 border-b border-[#ecf3e7] flex items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-black text-gray-900">랭킹·구매 반응 점검</h4>
                <p className="mt-1 text-xs font-bold text-gray-500">광고 시점 이후 채널별 반응과 혼선 요인을 같이 봅니다.</p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#6c9a4c] shrink-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white">
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">채널</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">상품</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">랭킹</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">구매</th>
                    <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">주의 요인</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ecf3e7]">
                  {commerceRankingRows.map((row) => (
                    <tr key={`${row.channel}-${row.product}`}>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-xl bg-[#6dec13]/15 px-3 py-1.5 text-xs font-black text-[#2a4519]">{row.channel}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-gray-900">{row.product}</p>
                        <p className="mt-1 text-[11px] font-bold text-gray-500">{row.action}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-gray-900">{row.rank}</p>
                        <p className="mt-1 text-[11px] font-black text-[#2a4519]">{row.delta}</p>
                      </td>
                      <td className="px-5 py-4 text-sm font-black text-gray-900">{row.purchase}</td>
                      <td className="px-5 py-4 text-xs font-bold text-gray-500">{row.confounder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-5 rounded-[2rem] bg-gray-900 p-6 text-white">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h4 className="text-lg font-black">가격·혜택 조건 비교</h4>
                <p className="mt-1 text-xs font-bold text-gray-400">선택 상품이 상위 상품 대비 어떤 조건인지 확인합니다.</p>
              </div>
              <Package className="w-5 h-5 text-[#6dec13] shrink-0" />
            </div>
            <div className="space-y-3">
              {leadingProductRows.map((row) => (
                <div key={row.product} className="rounded-2xl bg-white/8 border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-white">{row.product}</p>
                    <span className="rounded-lg bg-[#6dec13] px-2.5 py-1 text-[10px] font-black text-gray-900">{row.discount}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-black text-gray-500">가격</p>
                      <p className="mt-1 font-black text-gray-200">{row.price}</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-500">리뷰</p>
                      <p className="mt-1 font-black text-gray-200">{row.review}</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-500">평점</p>
                      <p className="mt-1 font-black text-gray-200">{row.rating}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-gray-400">{row.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-4 rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] p-5">
            <h4 className="text-lg font-black text-gray-900 mb-4">채널별 랭킹 변화</h4>
            <div className="space-y-3">
              {risingProductRows.map((row) => (
                <div key={row.product} className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-gray-900">{row.product}</p>
                      <p className="mt-1 text-[11px] font-bold text-gray-500">{row.channel} · {row.reason}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-black text-[#2a4519]">{row.signal}</span>
                  </div>
                  <p className="mt-3 text-[11px] font-black text-[#6c9a4c]">{row.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-4 rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] p-5">
            <h4 className="text-lg font-black text-gray-900 mb-4">리뷰 반응</h4>
            <div className="space-y-3">
              {reviewReactionRows.map((row) => (
                <div key={row.label} className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-gray-900">{row.label}</p>
                    <span className="text-sm font-black text-[#2a4519]">{row.value}</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-gray-500">{row.detail}</p>
                  <p className="mt-3 text-[11px] font-black text-[#6c9a4c]">{row.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-4 rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] p-5">
            <h4 className="text-lg font-black text-gray-900 mb-4">경쟁 상품 차이</h4>
            <div className="space-y-3">
              {competitorGapRows.map((row) => (
                <div key={row.topic} className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                  <p className="text-sm font-black text-gray-900">{row.topic}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-black text-gray-400">자사</p>
                      <p className="mt-1 font-black text-gray-900">{row.owned}</p>
                    </div>
                    <div>
                      <p className="font-black text-gray-400">경쟁</p>
                      <p className="mt-1 font-black text-gray-900">{row.competitor}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] font-black text-orange-500">{row.gap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">판매 채널별 구매 반응 추이</h3>
              <p className="mt-1 text-sm font-bold text-gray-400">광고 시점과 판매 채널 반응이 같은 기간에 움직이는지 확인합니다.</p>
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
            <h3 className="text-2xl font-black text-gray-900">선택 상품의 채널별 결과</h3>
            <p className="mt-1 text-sm font-bold text-gray-400">선택한 상품의 방문, 구매 반응, 광고 연결 정보를 채널별로 확인합니다.</p>
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
                      조건에 맞는 판매 채널 데이터가 없습니다.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default MyBrandView;
