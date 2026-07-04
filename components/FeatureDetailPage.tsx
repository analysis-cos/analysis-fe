import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  Radio,
  RefreshCw,
  ShoppingBag,
  Target,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { featurePageDetails, FeatureCategory, FeaturePageId } from '../brandDashPlan';
import { commerceFeaturePageContent, CommerceChartFormat, CommerceFeaturePageContent } from '../commerceFeaturePageContent';

interface FeatureDetailPageProps {
  featureId: FeaturePageId;
  onBack: () => void;
  onFeatureOpen: (featureId: FeaturePageId) => void;
  onOpenCategory: (category: FeatureCategory) => void;
}

const leadingTrendItems = [
  {
    label: '콘텐츠 반응',
    description: '조회, 좋아요, 댓글, 공유의 최근 흐름',
    current: '+18%',
    data: [42, 46, 45, 51, 57, 63, 69],
  },
  {
    label: '계정 성장',
    description: '구독자/팔로워와 월 성장률 흐름',
    current: '+7%',
    data: [31, 34, 36, 35, 39, 42, 44],
  },
  {
    label: '키워드 반응',
    description: '검색 키워드와 연관 콘텐츠 반응 흐름',
    current: '+12%',
    data: [28, 30, 34, 37, 36, 41, 45],
  },
  {
    label: '브랜드 언급',
    description: '자사/경쟁사 언급 콘텐츠 발생 흐름',
    current: '+9%',
    data: [18, 19, 23, 22, 27, 29, 31],
  },
];

const weekLabels = ['월', '화', '수', '목', '금', '토', '일'];

const categoryMeta = {
  leading: {
    label: '선행지표 기능',
    viewLabel: '선행지표로 돌아가기',
    icon: Radio,
    tone: 'bg-red-50 text-red-600',
    darkLabel: '콘텐츠·광고 신호',
  },
  lagging: {
    label: '후행지표 기능',
    viewLabel: '후행지표로 돌아가기',
    icon: ShoppingBag,
    tone: 'bg-[#6dec13]/15 text-[#2a4519]',
    darkLabel: '커머스·구매 신호',
  },
};

function formatChartValue(value: number | string, format: CommerceChartFormat) {
  const numeric = typeof value === 'number' ? value : Number(value);

  if (Number.isNaN(numeric)) return String(value);
  if (format === 'rank') return `${numeric}위`;
  if (format === 'percent') return `${numeric}%`;
  if (format === 'price') return `${numeric.toLocaleString('ko-KR')}원`;
  if (format === 'score') return `${numeric}점`;
  return numeric.toLocaleString('ko-KR');
}

function CommerceFeatureWorkspace({
  config,
  relatedFeatures,
  onFeatureOpen,
}: {
  config: CommerceFeaturePageContent;
  relatedFeatures: Array<(typeof featurePageDetails)[number] | undefined>;
  onFeatureOpen: (featureId: FeaturePageId) => void;
}) {
  const seriesByKey = config.chart.series.reduce<Record<string, CommerceChartFormat>>((acc, series) => {
    acc[series.key] = series.format;
    acc[series.label] = series.format;
    return acc;
  }, {});

  const renderChart = () => {
    if (config.chart.type === 'bar') {
      return (
        <BarChart data={config.chart.data} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf4e8" />
          <XAxis dataKey={config.chart.xKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
          <Tooltip
            contentStyle={{ borderRadius: 14, border: '1px solid #ecf3e7', fontWeight: 800 }}
            formatter={(value, name) => [formatChartValue(value as number, seriesByKey[String(name)] ?? 'score'), name]}
          />
          <Legend wrapperStyle={{ fontSize: 12, fontWeight: 800 }} />
          {config.chart.series.map((series) => (
            <Bar key={series.key} dataKey={series.key} name={series.label} fill={series.color} radius={[8, 8, 0, 0]} />
          ))}
        </BarChart>
      );
    }

    return (
      <LineChart data={config.chart.data} margin={{ top: 12, right: 12, left: -12, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf4e8" />
        <XAxis dataKey={config.chart.xKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }} />
        <YAxis
          reversed={config.chart.rankReversed}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fontWeight: 800, fill: '#6c9a4c' }}
          tickFormatter={(value) => formatChartValue(value, config.chart.series[0]?.format ?? 'count')}
        />
        <Tooltip
          contentStyle={{ borderRadius: 14, border: '1px solid #ecf3e7', fontWeight: 800 }}
          formatter={(value, name) => [formatChartValue(value as number, seriesByKey[String(name)] ?? 'count'), name]}
        />
        <Legend wrapperStyle={{ fontSize: 12, fontWeight: 800 }} />
        {config.chart.series.map((series) => (
          <Line
            key={series.key}
            type="monotone"
            dataKey={series.key}
            name={series.label}
            stroke={series.color}
            strokeWidth={3}
            dot={{ r: 4, fill: series.color, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">핵심 판단</p>
              <h3 className="mt-2 text-2xl font-black text-gray-900">{config.decisionTitle}</h3>
              <p className="mt-3 text-sm font-bold text-gray-500 leading-relaxed">{config.decisionSummary}</p>
            </div>
            <span className="shrink-0 px-3 py-2 rounded-xl bg-[#f7f8f6] text-xs font-black text-[#6c9a4c]">
              커머스 기능 상세
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {config.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
                <p className="text-[11px] font-black text-[#6c9a4c]">{kpi.label}</p>
                <p className="mt-2 text-2xl font-black text-gray-900">{kpi.value}</p>
                <p className="mt-1 text-[11px] font-bold text-gray-500 leading-relaxed">{kpi.helper}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.definitions.map((definition) => (
              <div key={definition.title} className="rounded-2xl border border-[#ecf3e7] bg-white p-5">
                <h4 className="text-sm font-black text-gray-900">{definition.title}</h4>
                <p className="mt-2 text-xs font-bold leading-relaxed text-gray-500">{definition.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl text-white">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 bg-[#6dec13] text-gray-900 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">해석 기준</h3>
              <p className="text-xs font-bold text-gray-400">그래프를 볼 때 먼저 확인할 것</p>
            </div>
          </div>
          <div className="space-y-4">
            {config.decisionBullets.map((bullet, index) => (
              <div key={bullet} className="flex gap-4">
                <span className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 text-[#6dec13] flex items-center justify-center text-xs font-black shrink-0">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm font-bold text-gray-300 leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">{config.chart.yHint}</p>
            <h3 className="mt-2 text-2xl font-black text-gray-900">{config.chart.title}</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 leading-relaxed">{config.chart.subtitle}</p>
          </div>
          {config.chart.rankReversed && (
            <span className="px-3 py-2 rounded-xl bg-[#f7f8f6] border border-[#ecf3e7] text-xs font-black text-[#2a4519]">
              낮을수록 좋음
            </span>
          )}
        </div>

        <div className="h-[320px]" role="img" aria-label={`${config.chart.title}. ${config.chart.subtitle}`}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs font-bold leading-relaxed text-gray-400">{config.chart.footnote}</p>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {config.drilldowns.map((drilldown) => (
          <div key={drilldown.title} className="bg-white rounded-[2rem] border border-[#ecf3e7] p-6 shadow-sm">
            <h3 className="text-xl font-black text-gray-900">{drilldown.title}</h3>
            <p className="mt-2 text-sm font-bold text-gray-500 leading-relaxed">{drilldown.description}</p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {drilldown.items.map((item) => (
                <div key={item} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4">
                  <p className="text-sm font-black text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-[2.5rem] border border-[#ecf3e7] shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-[#ecf3e7]">
          <h3 className="text-2xl font-black text-gray-900">{config.table.title}</h3>
          <p className="mt-2 text-sm font-bold text-gray-500">{config.table.description}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f7f8f6]">
              <tr>
                {config.table.headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ecf3e7]">
              {config.table.rows.map((row) => (
                <tr key={row.join('-')} className="hover:bg-[#6dec13]/5">
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`} className={`px-6 py-5 text-sm ${index === 0 ? 'font-black text-gray-900' : 'font-bold text-gray-600'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <h3 className="text-2xl font-black text-gray-900 mb-6">다음 액션</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.actions.map((action, index) => (
              <div key={action} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
                <span className="inline-flex w-8 h-8 rounded-xl bg-gray-900 text-[#6dec13] items-center justify-center text-xs font-black">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-black text-gray-900 leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-5">연결 기능</h3>
          <div className="space-y-3">
            {relatedFeatures.map((related) => related && (
              <button
                key={related.id}
                onClick={() => onFeatureOpen(related.id)}
                className="w-full text-left rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-4 hover:bg-[#6dec13]/10 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-gray-900">{related.title}</p>
                    <p className="mt-1 text-[11px] font-bold text-gray-500 line-clamp-2">{related.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#6c9a4c] shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const FeatureDetailPage: React.FC<FeatureDetailPageProps> = ({
  featureId,
  onBack,
  onFeatureOpen,
  onOpenCategory,
}) => {
  const feature = featurePageDetails.find((item) => item.id === featureId) ?? featurePageDetails[0];
  const relatedFeatures = feature.related
    .map((relatedId) => featurePageDetails.find((item) => item.id === relatedId))
    .filter(Boolean);
  const meta = categoryMeta[feature.category];
  const CategoryIcon = meta.icon;
  const commerceConfig = commerceFeaturePageContent[feature.id];
  const trendItems = leadingTrendItems;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="max-w-4xl">
          <button
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#ecf3e7] text-xs font-black text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            이전 화면
          </button>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase ${meta.tone}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {meta.label}
          </div>
          <h2 className="mt-4 text-4xl font-black text-gray-900">{feature.title}</h2>
          <p className="mt-3 text-sm md:text-base font-bold text-gray-500 leading-relaxed">
            {feature.description}
          </p>
        </div>

        <button
          onClick={() => onOpenCategory(feature.category)}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-gray-900 text-[#6dec13] text-sm font-black hover:bg-black transition-colors"
        >
          {meta.viewLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-[#6dec13]/15 text-[#2a4519] flex items-center justify-center mb-4">
            <Target className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase text-[#6c9a4c]">핵심 지표</p>
          <p className="mt-2 text-xl font-black text-gray-900 leading-snug">{feature.primaryMetric}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <RefreshCw className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase text-[#6c9a4c]">업데이트 주기</p>
          <p className="mt-2 text-xl font-black text-gray-900 leading-snug">{feature.refresh}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#ecf3e7] p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Layers3 className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-black uppercase text-[#6c9a4c]">연결 플랫폼</p>
          <p className="mt-2 text-xl font-black text-gray-900 leading-snug">{feature.platforms.join(' · ')}</p>
        </div>
      </section>

      {commerceConfig ? (
        <CommerceFeatureWorkspace
          config={commerceConfig}
          relatedFeatures={relatedFeatures}
          onFeatureOpen={onFeatureOpen}
        />
      ) : (
        <>
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-7 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-8">
                <div>
                  <p className="text-[11px] font-black uppercase text-[#6c9a4c]">{feature.sourceRows}</p>
                  <h3 className="mt-2 text-2xl font-black text-gray-900">이 기능의 목적</h3>
                  <p className="mt-2 text-sm font-bold text-gray-500 leading-relaxed">{feature.objective}</p>
                </div>
                <span className="px-3 py-2 rounded-xl bg-[#f7f8f6] text-xs font-black text-[#6c9a4c] shrink-0">
                  {meta.darkLabel}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <h4 className="text-xl font-black text-gray-900">항목별 7일 추이</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">최근 7일</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendItems.map((item, index) => {
                    const chartData = item.data.map((value, dayIndex) => ({
                      day: weekLabels[dayIndex],
                      value,
                    }));
                    const gradientId = `feature-trend-${feature.id}-${index}`;

                    return (
                      <div key={item.label} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h5 className="text-base font-black text-gray-900">{item.label}</h5>
                            <p className="mt-1 text-[11px] font-bold text-gray-500 leading-relaxed">{item.description}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ecf3e7] text-xs font-black text-[#2a4519] shrink-0">
                            {item.current}
                          </span>
                        </div>
                        <div className="h-[120px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#6dec13" stopOpacity={0.35} />
                                  <stop offset="95%" stopColor="#6dec13" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#6c9a4c' }} />
                              <YAxis hide domain={['dataMin - 6', 'dataMax + 6']} />
                              <Tooltip
                                contentStyle={{ borderRadius: 14, border: '1px solid #ecf3e7', fontWeight: 800 }}
                                formatter={(value) => [`${value}`, item.label]}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#2a4519"
                                strokeWidth={3}
                                fill={`url(#${gradientId})`}
                                dot={{ r: 3, fill: '#6dec13', stroke: '#fff', strokeWidth: 2 }}
                                activeDot={{ r: 5, fill: '#2a4519', stroke: '#6dec13', strokeWidth: 2 }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="xl:col-span-5 bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl text-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 bg-[#6dec13] text-gray-900 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black">운영 플로우</h3>
                  <p className="text-xs font-bold text-gray-400">실무자가 이 페이지에서 진행할 순서</p>
                </div>
              </div>

              <div className="space-y-4">
                {feature.workflow.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 text-[#6dec13] flex items-center justify-center text-xs font-black shrink-0">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm font-bold text-gray-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
              <h3 className="text-2xl font-black text-gray-900 mb-6">산출물</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feature.outputs.map((output) => (
                  <div key={output} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-5">
                    <p className="text-sm font-black text-gray-900">{output}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:col-span-4 bg-white rounded-[2.5rem] border border-[#ecf3e7] p-8 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-5">연결 기능</h3>
              <div className="space-y-3">
                {relatedFeatures.map((related) => related && (
                  <button
                    key={related.id}
                    onClick={() => onFeatureOpen(related.id)}
                    className="w-full text-left rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-4 hover:bg-[#6dec13]/10 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-gray-900">{related.title}</p>
                        <p className="mt-1 text-[11px] font-bold text-gray-500 line-clamp-2">{related.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6c9a4c] shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default FeatureDetailPage;
