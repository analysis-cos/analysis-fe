import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Layers3,
  MousePointerClick,
  Radio,
  ShoppingBag,
  TrendingUp,
  WalletCards,
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
import { Product } from '../types';
import {
  commerceFeatureCards,
  mediaFeatureCards,
  reportTemplates,
  roadmapItems,
  servicePrinciples,
  serviceProblems,
} from '../brandDashPlan';
import type { FeaturePageId } from '../brandDashPlan';

interface SummaryDashboardProps {
  onProductClick: (product: Product) => void;
  onFeatureOpen: (featureId: FeaturePageId) => void;
  onOpenServiceMap: () => void;
}

const kpiCards = [
  {
    label: '총 광고비',
    value: '₩18.4M',
    delta: '+22%',
    icon: WalletCards,
    tone: 'text-blue-600 bg-blue-50',
  },
  {
    label: '광고 클릭',
    value: '42,180',
    delta: '+31%',
    icon: MousePointerClick,
    tone: 'text-[#2a4519] bg-[#6dec13]/15',
  },
  {
    label: '구매 반응',
    value: '2,846',
    delta: '+18%',
    icon: ShoppingBag,
    tone: 'text-purple-600 bg-purple-50',
  },
  {
    label: '통합 ROAS',
    value: '387%',
    delta: '+41p',
    icon: TrendingUp,
    tone: 'text-orange-600 bg-orange-50',
  },
];

const performanceTrend = [
  { day: '월', spend: 320, revenue: 980, clicks: 4100 },
  { day: '화', spend: 360, revenue: 1120, clicks: 4550 },
  { day: '수', spend: 420, revenue: 1460, clicks: 5200 },
  { day: '목', spend: 390, revenue: 1320, clicks: 4980 },
  { day: '금', spend: 510, revenue: 1880, clicks: 6410 },
  { day: '토', spend: 620, revenue: 2410, clicks: 7900 },
  { day: '일', spend: 580, revenue: 2230, clicks: 7040 },
];

const channelLinks = [
  {
    source: 'YouTube',
    target: '올리브영',
    spend: '₩7.8M',
    conversion: '1,184건',
    roas: '421%',
    status: '예산 증액 후보',
  },
  {
    source: 'Instagram',
    target: '쿠팡',
    spend: '₩4.2M',
    conversion: '694건',
    roas: '362%',
    status: '소재 추가 필요',
  },
  {
    source: 'Meta Ads',
    target: '네이버',
    spend: '₩3.6M',
    conversion: '518건',
    roas: '298%',
    status: '랜딩 개선 필요',
  },
];

const channelRevenue = [
  { channel: '올리브영', revenue: 3280 },
  { channel: '쿠팡', revenue: 2140 },
  { channel: '네이버', revenue: 1760 },
];

const insightProducts = MOCK_PRODUCTS.slice(0, 4).map((product, index) => ({
  product,
  leading: ['유튜브 리뷰 영상', '인스타 릴스', '메타 리타겟팅', '쇼츠 체험단'][index],
  lagging: ['올리브영 구매 +28%', '쿠팡 구매 +19%', '네이버 검색전환 +14%', '올리브영 랭킹 +5'][index],
  action: ['예산 증액', '소재 복제', '랜딩 개선', '리뷰 확보'][index],
}));

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ onProductClick, onFeatureOpen, onOpenServiceMap }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="bg-gray-900 rounded-[2rem] p-6 md:p-8 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6dec13]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6dec13]/15 text-[#6dec13] rounded-full text-[11px] font-black uppercase tracking-widest mb-5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              요약 대시보드
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              흩어진 시그널을 하나의 브랜드 성장 스토리로 연결합니다.
            </h2>
            <p className="max-w-3xl text-sm md:text-base font-bold text-gray-300 leading-relaxed">
              콘텐츠, 커머스, 소비자 데이터를 연결하여 브랜드 성장 흐름을 분석하는
              Marketing Growth Intelligence Platform입니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-full xl:min-w-[420px]">
            <div className="bg-white/8 border border-white/10 rounded-2xl p-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">오늘의 판단</p>
              <p className="mt-2 text-xl font-black text-[#6dec13]">유튜브 예산 증액</p>
            </div>
            <div className="bg-white/8 border border-white/10 rounded-2xl p-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">주의 상품</p>
              <p className="mt-2 text-xl font-black text-orange-300">3개</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-[#ecf3e7] rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">{card.label}</p>
                  <p className="mt-2 text-3xl font-black text-gray-900">{card.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.tone}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-xs font-black text-[#2a4519]">{card.delta} vs 전주</p>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">광고비와 구매 매출 흐름</h3>
              <p className="text-sm font-bold text-gray-400 mt-1">선행 집행 이후 후행 매출이 따라오는지 확인합니다.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-[#6c9a4c] bg-[#6dec13]/10 rounded-xl px-3 py-2">
              <Radio className="w-4 h-4" />
              최근 7일
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend}>
                <defs>
                  <linearGradient id="summaryRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6dec13" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6dec13" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f6ef" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#6c9a4c' }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
                <Area type="monotone" dataKey="revenue" name="구매 매출" stroke="#6dec13" strokeWidth={4} fill="url(#summaryRevenue)" />
                <Area type="monotone" dataKey="spend" name="광고비" stroke="#111827" strokeWidth={3} fill="transparent" strokeDasharray="7 6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-[#6dec13]/15 text-[#2a4519] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">판매 채널 매출</h3>
              <p className="text-xs font-bold text-gray-400">단위: 만원</p>
            </div>
          </div>
          <div className="h-[285px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelRevenue} layout="vertical" margin={{ left: 12, right: 8 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 800, fill: '#374151' }} width={70} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #ecf3e7', fontWeight: 800 }} />
                <Bar dataKey="revenue" fill="#6dec13" radius={[0, 12, 12, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {channelLinks.map((item) => (
          <div key={`${item.source}-${item.target}`} className="bg-white rounded-2xl border border-[#ecf3e7] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-gray-900 text-[#6dec13] rounded-xl text-xs font-black">{item.source}</span>
                <ArrowRight className="w-4 h-4 text-gray-300" />
                <span className="px-3 py-1.5 bg-[#6dec13]/15 text-[#2a4519] rounded-xl text-xs font-black">{item.target}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">광고비</p>
                <p className="mt-1 font-black text-gray-900">{item.spend}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">구매</p>
                <p className="mt-1 font-black text-gray-900">{item.conversion}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ROAS</p>
                <p className="mt-1 font-black text-gray-900">{item.roas}</p>
              </div>
            </div>
            <p className="text-xs font-black text-[#6c9a4c] bg-[#f7f8f6] rounded-xl px-3 py-2">{item.status}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">Feature Map</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">기능 페이지 바로가기</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              선행 신호를 보는 기능과 후행 구매 결과를 보는 기능을 업무 단위 페이지로 분리했습니다.
            </p>
          </div>
          <button
            onClick={onOpenServiceMap}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 text-sm font-black text-[#6dec13] hover:bg-black"
          >
            <Layers3 className="h-4 w-4" />
            서비스 기능 전체 맵
          </button>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900">선행지표 기능</h4>
                <p className="text-xs font-bold text-gray-400">콘텐츠·광고·크리에이터</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mediaFeatureCards.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => onFeatureOpen(feature.id)}
                  className="group text-left rounded-2xl bg-white border border-[#ecf3e7] p-4 hover:bg-[#6dec13]/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-gray-900">{feature.title}</p>
                      <p className="mt-1 text-[11px] font-bold text-gray-500 line-clamp-2">{feature.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900">후행지표 기능</h4>
                <p className="text-xs font-bold text-gray-400">랭킹·구매 반응·리뷰 반응</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commerceFeatureCards.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => onFeatureOpen(feature.id)}
                  className="group text-left rounded-2xl bg-white border border-[#ecf3e7] p-4 hover:bg-[#6dec13]/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-gray-900">{feature.title}</p>
                      <p className="mt-1 text-[11px] font-bold text-gray-500 line-clamp-2">{feature.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[#ecf3e7] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-gray-900">우선 대응 상품</h3>
            <p className="text-sm font-bold text-gray-400 mt-1">선행 신호와 후행 구매 결과를 같이 보고 다음 액션을 정합니다.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f7f8f6]">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">상품</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">선행 신호</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">후행 결과</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c] text-right">권장 액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecf3e7]">
              {insightProducts.map(({ product, leading, lagging, action }) => (
                <tr key={product.rank} className="hover:bg-[#6dec13]/5 cursor-pointer" onClick={() => onProductClick(product)}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
                      <div>
                        <p className="font-black text-gray-900 line-clamp-1 max-w-[360px]">{product.name}</p>
                        <p className="text-[11px] font-bold text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-600">{leading}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-600">{lagging}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex px-3 py-1.5 bg-gray-900 text-[#6dec13] rounded-xl text-xs font-black">{action}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <details className="group bg-white rounded-[2rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">기획 상세 보기</h3>
            <p className="mt-1 text-sm font-bold text-gray-400">서비스 구조, 해결 문제, 로드맵, 리포트 후보</p>
          </div>
          <span className="px-3 py-2 rounded-xl bg-[#f7f8f6] text-xs font-black text-[#6c9a4c] group-open:bg-[#6dec13] group-open:text-gray-900">
            펼치기
          </span>
        </summary>

        <div className="px-6 pb-6 space-y-6">
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-7 bg-[#f7f8f6] border border-[#ecf3e7] rounded-[2rem] p-6">
              <h3 className="text-xl font-black text-gray-900 mb-5">통합 분석 구조</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicePrinciples.map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#ecf3e7]">
                    <h4 className="font-black text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-xs font-bold text-gray-500 leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.metrics.slice(0, 4).map((metric) => (
                        <span key={metric} className="px-2 py-1 bg-[#f7f8f6] rounded-lg text-[10px] font-black text-[#6c9a4c] border border-[#ecf3e7]">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:col-span-5 bg-[#f7f8f6] border border-[#ecf3e7] rounded-[2rem] p-6">
              <h3 className="text-xl font-black text-gray-900 mb-5">해결해야 하는 문제</h3>
              <div className="space-y-3">
                {serviceProblems.map((problem, index) => (
                  <div key={problem} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center text-[10px] font-black shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold text-gray-600 leading-relaxed">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-7 bg-[#f7f8f6] rounded-[2rem] border border-[#ecf3e7] p-6">
              <h3 className="text-xl font-black text-gray-900 mb-5">구현 로드맵</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmapItems.map((item) => (
                  <div key={item.phase} className="rounded-2xl border border-[#ecf3e7] p-5 bg-white">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-black text-[#6c9a4c]">{item.phase}</span>
                      <span className="px-2 py-1 rounded-lg bg-[#f7f8f6] text-[10px] font-black text-gray-500 border border-[#ecf3e7]">{item.status}</span>
                    </div>
                    <p className="text-sm font-black text-gray-900 leading-relaxed">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:col-span-5 bg-[#f7f8f6] rounded-[2rem] border border-[#ecf3e7] p-6">
              <h3 className="text-xl font-black text-gray-900 mb-5">자동화 리포트 후보</h3>
              <div className="flex flex-wrap gap-2">
                {reportTemplates.map((template) => (
                  <span key={template} className="px-3 py-2 rounded-xl bg-gray-900 text-[#6dec13] text-xs font-black">
                    {template}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </details>
    </div>
  );
};

export default SummaryDashboard;
