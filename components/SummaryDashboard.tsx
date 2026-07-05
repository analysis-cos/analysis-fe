import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
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

interface SummaryDashboardProps {
  onProductClick: (product: Product) => void;
}

const kpiCards = [
  {
    label: '관리 상품',
    value: `${MOCK_PRODUCTS.slice(0, 10).length}개`,
    delta: '상위 상품 기준',
    icon: BarChart3,
    tone: 'text-[#2a4519] bg-[#6dec13]/15',
  },
  {
    label: '집행 광고비',
    value: '₩18.4M',
    delta: '전주 대비 +22%',
    icon: WalletCards,
    tone: 'text-blue-600 bg-blue-50',
  },
  {
    label: '구매 건수',
    value: '2,846',
    delta: '전주 대비 +18%',
    icon: ShoppingBag,
    tone: 'text-purple-600 bg-purple-50',
  },
  {
    label: '평균 ROAS',
    value: '387%',
    delta: '전주 대비 +41p',
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

const channelRevenue = [
  { channel: '올리브영', revenue: 3280 },
  { channel: '쿠팡', revenue: 2140 },
  { channel: '네이버', revenue: 1760 },
];

const campaignSummaries = [
  {
    campaign: '브랜드 리뷰 콘텐츠 캠페인',
    period: '01.08 - 01.14',
    spend: '₩7.8M',
    purchase: '1,184건',
    roas: '421%',
    summary: '주력 상품군의 리뷰형 콘텐츠 집행 이후 판매 채널 반응과 랭킹 변화를 함께 확인합니다.',
    nextAction: '예산 검토',
  },
  {
    campaign: '신규 소재 확장 캠페인',
    period: '01.10 - 01.14',
    spend: '₩4.2M',
    purchase: '694건',
    roas: '362%',
    summary: '숏폼 소재 반응이 높은 상품군을 중심으로 판매 채널 반응이 따라오는지 점검합니다.',
    nextAction: '소재 확장',
  },
  {
    campaign: '리타겟팅 캠페인',
    period: '01.12 - 01.14',
    spend: '₩3.6M',
    purchase: '518건',
    roas: '298%',
    summary: '클릭 흐름은 유지되지만 후행 신호가 둔화되는 상품은 상세 페이지와 혜택 조건을 확인합니다.',
    nextAction: '상세 점검',
  },
  {
    campaign: '판매 채널 반응 점검',
    period: '01.13 - 01.14',
    spend: '₩2.8M',
    purchase: '432건',
    roas: '314%',
    summary: '판매 채널별로 구매 흐름이 강한 상품군과 약한 상품군을 나눠 봅니다.',
    nextAction: '채널 조정',
  },
];

const brandWorkflowRows = [
  {
    title: '선행 신호가 강한 상품',
    leading: '리뷰 콘텐츠 클릭률과 완주율 확인',
    commerce: '판매 채널별 구매 건수와 랭킹 변화 비교',
    check: '할인·쿠폰·증정 동시 진행 여부 확인',
    action: '예산 검토',
  },
  {
    title: '선행 신호는 좋지만 후행 신호가 약한 상품',
    leading: '소재 저장률과 클릭 흐름 확인',
    commerce: '상품 상세 유입과 가격 조건 점검',
    check: '상품 상세, 리뷰 수, 혜택 조건 확인',
    action: '상세 점검',
  },
  {
    title: '후행 신호는 있으나 선행 신호가 약한 상품',
    leading: '소재 형식과 플랫폼별 반응 비교',
    commerce: '구매 반응이 유지되는 채널 확인',
    check: '강한 채널 기준으로 소재 재구성',
    action: '소재 개선',
  },
];

const analysisFocusRows = [
  {
    label: '소재 성과 비교',
    metric: '플랫폼별 참여율',
    status: '예산 배분 판단',
  },
  {
    label: '광고 시점 등록',
    metric: '캠페인 날짜·URL',
    status: '구매 추이와 연결',
  },
  {
    label: '판매 채널 반응',
    metric: '구매 건수·랭킹 추이',
    status: '채널별 효율 확인',
  },
  {
    label: '가격·혜택 혼선',
    metric: '할인·쿠폰·증정',
    status: '해석 주의',
  },
];

const insightProducts = MOCK_PRODUCTS.slice(0, 6).map((product, index) => ({
  product,
  leading: ['리뷰 콘텐츠 반응', '숏폼 소재 반응', '리타겟팅 클릭', '콘텐츠 저장 반응', '소재 클릭 유지', '영상 완주율 개선'][index],
  lagging: ['올리브영 랭킹 변화', '쿠팡 구매 건수', '네이버 상품 상세 유입', '올리브영 구매 건수', '채널별 구매 흐름', '리뷰 수 변화'][index],
  action: ['예산 검토', '소재 확장', '상세 점검', '리뷰 확보', '채널 조정', '혜택 점검'][index],
}));

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ onProductClick }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="bg-gray-900 rounded-[2rem] p-6 md:p-8 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6dec13]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6dec13]/15 text-[#6dec13] rounded-full text-[11px] font-black uppercase tracking-widest mb-5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              요약 대시보드
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              담당 브랜드 전체의 선행 신호와 후행 신호를 요약합니다.
            </h2>
            <p className="max-w-3xl text-sm md:text-base font-bold text-gray-300 leading-relaxed">
              상품별 광고 집행, 소재 반응, 판매 채널 흐름, 랭킹 변화를 합산해서 브랜드 단위로 확인합니다.
            </p>
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
              <p className="mt-4 text-xs font-black text-[#2a4519]">{card.delta}</p>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900">광고비와 구매 흐름</h3>
              <p className="text-sm font-bold text-gray-400 mt-1">선행 집행 시점과 후행 구매 흐름을 함께 확인합니다.</p>
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
                <Area type="monotone" dataKey="revenue" name="거래액" stroke="#6dec13" strokeWidth={4} fill="url(#summaryRevenue)" />
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
              <h3 className="text-xl font-black text-gray-900">판매 채널 반응</h3>
              <p className="text-xs font-bold text-gray-400">채널별 거래액 기준</p>
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

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">캠페인 요약</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">캠페인별 요약</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              광고 집행 단위로 선행 플랫폼과 판매 채널 반응을 함께 확인합니다.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">가로로 넘겨 보기</span>
        </div>

        <div className="p-6 lg:p-8 overflow-x-auto">
          <div className="flex gap-5 min-w-max snap-x snap-mandatory pb-1">
            {campaignSummaries.map((item) => (
              <article key={item.campaign} className="w-[320px] md:w-[380px] snap-start rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-6">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">{item.period}</p>
                    <h4 className="mt-2 text-xl font-black text-gray-900 leading-snug">{item.campaign}</h4>
                  </div>
                  <span className="shrink-0 px-3 py-1.5 bg-white border border-[#ecf3e7] text-xs font-black text-[#2a4519] rounded-xl">
                    {item.nextAction}
                  </span>
                </div>

                <p className="min-h-[60px] text-sm font-bold leading-relaxed text-gray-600">{item.summary}</p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white border border-[#ecf3e7] p-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">광고비</p>
                    <p className="mt-1 font-black text-gray-900">{item.spend}</p>
                  </div>
                  <div className="rounded-2xl bg-white border border-[#ecf3e7] p-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">구매 건수</p>
                    <p className="mt-1 font-black text-gray-900">{item.purchase}</p>
                  </div>
                  <div className="rounded-2xl bg-white border border-[#ecf3e7] p-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ROAS</p>
                    <p className="mt-1 font-black text-gray-900">{item.roas}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7] flex flex-col xl:flex-row xl:items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">상품별 연결 현황</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">선행 신호와 후행 신호를 상품별로 묶어 봅니다</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 max-w-3xl">
              브랜드 전체를 보되, 원인 확인은 상품 단위로 내려가서 볼 수 있게 정리합니다.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">상품 단위 요약</span>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 rounded-[2rem] bg-[#f7f8f6] border border-[#ecf3e7] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900">광고 집행 확인</h4>
                    <p className="text-xs font-bold text-gray-400">광고비, 플랫폼, 소재 반응</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {analysisFocusRows.slice(0, 2).map((row) => (
                    <div key={row.label} className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-gray-900">{row.label}</p>
                          <p className="mt-1 text-[11px] font-bold text-gray-500">{row.metric}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-black text-[#6c9a4c]">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center px-2">
                <div className="w-10 h-10 rounded-full bg-white border border-[#ecf3e7] flex items-center justify-center text-gray-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 border-t md:border-t-0 md:border-l border-[#ecf3e7]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900">판매 채널 확인</h4>
                    <p className="text-xs font-bold text-gray-400">구매 건수, 랭킹, 가격 변수</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {analysisFocusRows.slice(2).map((row) => (
                    <div key={row.label} className="rounded-2xl bg-white border border-[#ecf3e7] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-gray-900">{row.label}</p>
                          <p className="mt-1 text-[11px] font-bold text-gray-500">{row.metric}</p>
                        </div>
                        <span className="shrink-0 text-[10px] font-black text-[#6c9a4c]">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-5 rounded-[2rem] bg-gray-900 p-6 text-white">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h4 className="text-lg font-black">우선 확인 상품군</h4>
                <p className="mt-1 text-xs font-bold text-gray-400">브랜드 전체에서 우선 확인할 상품군입니다.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6dec13]">3건</span>
            </div>
            <div className="space-y-3">
              {brandWorkflowRows.map((row) => (
                <div key={row.title} className="rounded-2xl bg-white/8 border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-white">{row.title}</p>
                      <p className="mt-2 text-xs font-bold text-gray-300">{row.leading}</p>
                      <p className="mt-1 text-xs font-bold text-gray-300">{row.commerce}</p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-[#6dec13] px-2.5 py-1 text-[10px] font-black text-gray-900">{row.action}</span>
                  </div>
                  <p className="mt-3 text-[11px] font-black text-orange-200">{row.check}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[#ecf3e7] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-gray-900">상품별 선행·후행 연결 현황</h3>
            <p className="text-sm font-bold text-gray-400 mt-1">각 상품의 선행/후행 신호와 다음 작업을 브랜드 전체 관점에서 봅니다.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f7f8f6]">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">상품</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">선행 신호</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">후행 신호</th>
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

    </div>
  );
};

export default SummaryDashboard;
