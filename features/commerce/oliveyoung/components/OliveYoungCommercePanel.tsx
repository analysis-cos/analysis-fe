import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  Info,
  Lock,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getOliveYoungAnalysis } from '../api';
import { METRIC_DOMAIN_LABELS, RESTRICTED_METRIC_IDS } from '../constants';
import type {
  ConfounderType,
  MetricDomain,
  OliveYoungAnalysisViewModel,
  OliveYoungBadgeState,
  OliveYoungDataSourceStatus,
  OliveYoungDerivedEffect,
  OliveYoungMetricDefinition,
  OliveYoungPanelState,
  OliveYoungProductSnapshot,
  OliveYoungReviewVocSummary,
  OliveYoungScenarioId,
  OliveYoungTimelinePoint,
} from '../types';
import {
  buildEffectSummaryText,
  CONFOUNDER_LABELS,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatPriceKRW,
  formatRank,
  formatRating,
  getAvailabilityLabel,
  getConfounderDescription,
  getReliabilityLabel,
  getSourceTypeLabel,
  normalizeRankDelta,
  shouldShowInSummary,
} from '../utils';
import {
  AccuracyGradeBadge,
  ConfidenceBadge,
  EffectSignalBadge,
  MetricAvailabilityBadge,
  ReliabilityBadge,
  SourceTypeBadge,
} from './Badges';
import { EmptyOliveYoungState, OliveYoungErrorState, OliveYoungLoadingSkeleton } from './States';

interface OliveYoungCommercePanelProps {
  campaignId?: string;
  productId?: string;
  scenario?: OliveYoungScenarioId;
}

const metricFilterLabels = ['전체', '요약 노출', '수집 가능', '권한 필요', '계산 지표', '제공 불가'] as const;
type MetricFilter = (typeof metricFilterLabels)[number];

const timelineMetricOptions = [
  { key: 'rank' as const, label: '랭킹', formatter: formatRank, helper: '낮을수록 좋은 값입니다.' },
  { key: 'reviewCount' as const, label: '리뷰 수', formatter: formatNumber, helper: '공개 리뷰 수 기준입니다.' },
  { key: 'discountRate' as const, label: '할인율', formatter: formatPercent, helper: '계산 지표일 수 있습니다.' },
  { key: 'salePrice' as const, label: '가격', formatter: formatPriceKRW, helper: '표시가 기준입니다.' },
  { key: 'rating' as const, label: '평점', formatter: formatRating, helper: '리뷰 표기 기준입니다.' },
];

const confounderFallback: ConfounderType[] = ['UNKNOWN'];

function DataQualityTooltip({ reasons, score }: { reasons: string[]; score?: number }) {
  const label = typeof score === 'number' ? `${score}점` : '사유 확인';
  return (
    <span
      className="inline-flex rounded-lg bg-[#f7f8f6] px-2.5 py-1 text-[10px] font-black text-[#6c9a4c] border border-[#ecf3e7]"
      title={reasons.join('\n')}
      aria-label={`데이터 품질 ${label}. ${reasons.join(' ')}`}
    >
      {label}
    </span>
  );
}

function BadgeList({ badges }: { badges?: OliveYoungBadgeState }) {
  const items = [
    badges?.hasCoupon ? '쿠폰' : null,
    badges?.hasGift ? '증정' : null,
    badges?.hasTodayDream ? '오늘드림' : null,
    badges?.hasOnePlusOne ? '1+1' : null,
    badges?.hasSale ? '세일' : null,
  ].filter(Boolean);

  if (items.length === 0) {
    return <span className="text-xs font-bold text-gray-400">확인된 배지 없음</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-lg bg-[#6dec13]/15 px-2 py-1 text-[10px] font-black text-[#2a4519]">
          {item}
        </span>
      ))}
    </div>
  );
}

export const OliveYoungDataReliabilityBanner: React.FC<{ status: OliveYoungDataSourceStatus }> = ({ status }) => (
  <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6dec13]/15 text-[#2a4519]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ReliabilityBadge level={status.reliabilityLevel} />
            {status.sourceTypes.map((sourceType) => (
              <SourceTypeBadge key={sourceType} sourceType={sourceType} />
            ))}
          </div>
          <p className="mt-3 max-w-4xl text-sm font-bold leading-relaxed text-gray-600">
            랭킹과 리뷰 변화는 광고 효용의 연관 신호이며, 광고 단독 효과를 의미하지 않습니다.
            정확한 판매량/매출/전환율은 파트너 데이터 없이는 포함되지 않습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs xl:min-w-[420px]">
        <div className="rounded-2xl bg-[#f7f8f6] p-3">
          <p className="font-black text-gray-400">마지막 관측</p>
          <p className="mt-1 font-black text-gray-900">{formatDateTime(status.lastObservedAt)}</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] p-3">
          <p className="font-black text-gray-400">마지막 수집</p>
          <p className="mt-1 font-black text-gray-900">{formatDateTime(status.lastCollectedAt)}</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] p-3">
          <p className="font-black text-gray-400">사용 가능</p>
          <p className="mt-1 font-black text-gray-900">{status.availableMetricCount}개</p>
        </div>
        <div className="rounded-2xl bg-[#f7f8f6] p-3">
          <p className="font-black text-gray-400">제한/불가</p>
          <p className="mt-1 font-black text-gray-900">
            {status.restrictedMetricCount + status.unsupportedMetricCount}개
          </p>
        </div>
      </div>
    </div>

    {(status.warnings.length > 0 || status.limitations.length > 0 || status.dataQualityReasons.length > 0) && (
      <details className="group mt-4 rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-xs font-black text-[#6c9a4c]">
          신뢰도와 한계 자세히
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="grid grid-cols-1 gap-4 px-4 pb-4 text-xs font-bold leading-relaxed text-gray-600 md:grid-cols-3">
          <div>
            <p className="mb-2 font-black text-gray-900">주의사항</p>
            {status.warnings.map((item) => <p key={item}>- {item}</p>)}
          </div>
          <div>
            <p className="mb-2 font-black text-gray-900">제한사항</p>
            {status.limitations.map((item) => <p key={item}>- {item}</p>)}
          </div>
          <div>
            <p className="mb-2 font-black text-gray-900">품질 사유</p>
            {status.dataQualityReasons.map((item) => <p key={item}>- {item}</p>)}
          </div>
        </div>
      </details>
    )}
  </section>
);

export const OliveYoungSummaryCards: React.FC<{
  currentSnapshot?: OliveYoungProductSnapshot;
  summary: OliveYoungDerivedEffect;
}> = ({ currentSnapshot, summary }) => {
  const rankDelta = normalizeRankDelta(currentSnapshot?.rank, currentSnapshot?.previousRank);
  const badges = currentSnapshot?.badges;
  const promotionText = [
    badges?.hasCoupon ? '쿠폰' : null,
    badges?.hasGift ? '증정' : null,
    badges?.hasTodayDream ? '오늘드림' : null,
    badges?.hasSale ? '세일' : null,
  ].filter(Boolean).join(' · ');
  const reviewDelta = typeof summary.reviewCountDeltaD7 === 'number' ? `+${formatNumber(summary.reviewCountDeltaD7)}개` : '데이터 없음';
  const ratingDelta = typeof summary.ratingDeltaD7 === 'number'
    ? summary.ratingDeltaD7 === 0 ? '변동 없음' : `${summary.ratingDeltaD7 > 0 ? '+' : ''}${summary.ratingDeltaD7.toFixed(1)}`
    : '데이터 없음';
  const discountDelta = typeof summary.discountRateChange === 'number'
    ? summary.discountRateChange === 0 ? '변화 없음' : `${summary.discountRateChange > 0 ? '+' : ''}${Math.round(summary.discountRateChange)}%p`
    : '수집 제한';

  const cards = [
    { label: '현재 랭킹', value: formatRank(currentSnapshot?.rank), detail: currentSnapshot?.categoryName ?? '카테고리 없음' },
    { label: '캠페인 전 대비', value: rankDelta.label, detail: rankDelta.direction === 'unknown' ? '기준일 스냅샷 필요' : 'D+7 기준' },
    { label: '리뷰 수 변화', value: reviewDelta, detail: 'D+7 기준' },
    { label: '평점 변화', value: formatRating(currentSnapshot?.rating), detail: ratingDelta },
    { label: '할인율/가격 변화', value: discountDelta, detail: `${formatPriceKRW(currentSnapshot?.salePrice)} 현재 표시가` },
    { label: '프로모션 상태', value: promotionText || '확인된 배지 없음', detail: '쿠폰 · 증정 · 오늘드림 기준' },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-[#ecf3e7] bg-white p-5 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#6c9a4c]">{card.label}</p>
          <p className="mt-2 min-h-[56px] text-2xl font-black leading-tight text-gray-900">{card.value}</p>
          <p className="mt-3 text-xs font-bold leading-relaxed text-gray-400">{card.detail}</p>
        </div>
      ))}
    </section>
  );
};

export const OliveYoungEffectSummary: React.FC<{
  summary: OliveYoungDerivedEffect;
  status: OliveYoungDataSourceStatus;
}> = ({ summary, status }) => {
  const effectText = buildEffectSummaryText(summary);
  const hasPromotionWarning = summary.confounders.some((type) => ['DISCOUNT', 'COUPON', 'GIFT'].includes(type));

  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <EffectSignalBadge signal={summary.effectSignal} />
            <ConfidenceBadge confidence={summary.confidence} />
            <span className="rounded-lg bg-[#f7f8f6] px-2.5 py-1 text-[10px] font-black text-[#6c9a4c] border border-[#ecf3e7]">
              데이터 신뢰도 {getReliabilityLabel(status.reliabilityLevel)}
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900">커머스 연관 신호 해석</h3>
          <p className="mt-3 max-w-5xl text-sm font-bold leading-relaxed text-gray-600">{effectText}</p>
        </div>
        <div className="rounded-2xl bg-gray-900 p-5 text-white xl:max-w-[360px]">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">요약 근거</p>
          <div className="mt-3 space-y-2">
            {summary.reasons.slice(0, 3).map((reason) => (
              <p key={reason} className="text-xs font-bold leading-relaxed text-gray-300">- {reason}</p>
            ))}
          </div>
        </div>
      </div>

      {(summary.warnings.length > 0 || hasPromotionWarning) && (
        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-black text-gray-900">주의</p>
              <div className="mt-2 space-y-1 text-xs font-bold leading-relaxed text-gray-600">
                {summary.warnings.map((warning) => <p key={warning}>- {warning}</p>)}
                {hasPromotionWarning && <p>- 할인/증정/쿠폰이 함께 발생해 복합 요인으로 해석해야 합니다.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function getMetricValue(point: OliveYoungTimelinePoint, key: (typeof timelineMetricOptions)[number]['key']) {
  return point[key] ?? null;
}

export const OliveYoungTimelineChart: React.FC<{ timeline: OliveYoungTimelinePoint[] }> = ({ timeline }) => {
  const [activeMetrics, setActiveMetrics] = useState<Array<(typeof timelineMetricOptions)[number]['key']>>(['rank', 'reviewCount', 'discountRate']);

  const toggleMetric = (key: (typeof timelineMetricOptions)[number]['key']) => {
    setActiveMetrics((prev) => {
      if (prev.includes(key)) return prev.filter((item) => item !== key);
      if (prev.length >= 3) return [prev[1], prev[2], key];
      return [...prev, key];
    });
  };

  const eventLabels = timeline.flatMap((point) => point.eventLabels?.map((label) => `${point.date} ${label}`) ?? []);

  if (timeline.length < 2) {
    return (
      <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-gray-900">올리브영 타임라인</h3>
        <p className="mt-3 text-sm font-bold text-gray-500">시계열 데이터가 2개 미만이라 미니 테이블로 표시합니다.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody>
              {timeline.map((point) => (
                <tr key={point.date} className="border-t border-[#ecf3e7]">
                  <td className="py-3 font-black text-gray-900">{point.date}</td>
                  <td className="py-3 text-gray-600">{formatNumber(point.reviewCount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 className="text-2xl font-black text-gray-900">올리브영 타임라인</h3>
          <p className="mt-2 text-sm font-bold text-gray-500">
            랭킹은 낮을수록 좋은 값입니다. 가격/프로모션 변화가 큰 구간은 광고 단독 효과로 해석하지 않습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {timelineMetricOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => toggleMetric(option.key)}
              className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${
                activeMetrics.includes(option.key) ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
              }`}
              title={option.helper}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {timelineMetricOptions.filter((option) => activeMetrics.includes(option.key)).map((option) => (
          <div key={option.key} className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-gray-900">{option.label}</p>
                <p className="mt-1 text-[11px] font-bold text-gray-500">{option.helper}</p>
              </div>
            </div>
            <div className="h-[170px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#6c9a4c' }} />
                  <YAxis hide reversed={option.key === 'rank'} domain={['dataMin - 4', 'dataMax + 4']} />
                  <Tooltip
                    contentStyle={{ borderRadius: 14, border: '1px solid #ecf3e7', fontWeight: 800 }}
                    formatter={(value) => [option.formatter(Number(value)), option.label]}
                    labelFormatter={(label) => `관측일 ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey={(point: OliveYoungTimelinePoint) => getMetricValue(point, option.key)}
                    name={option.label}
                    stroke={option.key === 'discountRate' ? '#f59e0b' : option.key === 'rank' ? '#111827' : '#2a4519'}
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#6dec13', stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {eventLabels.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {eventLabels.map((label) => (
            <span key={label} className="rounded-xl bg-[#6dec13]/15 px-3 py-2 text-xs font-black text-[#2a4519]">
              {label}
            </span>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs font-bold text-gray-400">
        차트는 관측 시점별 공개 화면 스냅샷과 계산 지표의 흐름을 보여줍니다.
      </p>
    </section>
  );
};

export const OliveYoungConfounderPanel: React.FC<{
  confounders: ConfounderType[];
  summary: OliveYoungDerivedEffect;
}> = ({ confounders, summary }) => {
  const items = confounders.length > 0 ? confounders : confounderFallback;
  const hasKnownConfounders = confounders.length > 0 && !confounders.includes('UNKNOWN');

  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Info className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black text-gray-900">해석 주의 요인</h3>
          <p className="mt-2 text-sm font-bold leading-relaxed text-gray-500">
            {hasKnownConfounders
              ? '이 기간의 랭킹 변화는 광고 외 요인의 영향을 함께 받았을 수 있습니다.'
              : summary.confidence === 'UNKNOWN'
                ? '일부 이벤트 데이터가 없어 해석 신뢰도가 낮을 수 있습니다.'
                : '현재 데이터 기준으로 확인된 주요 가격/프로모션 혼선 요인은 없습니다.'}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {items.map((type) => (
              <div key={type} className="rounded-2xl bg-[#f7f8f6] border border-[#ecf3e7] p-4" title={getConfounderDescription(type)}>
                <p className="text-sm font-black text-gray-900">{CONFOUNDER_LABELS[type]}</p>
                <p className="mt-2 text-xs font-bold leading-relaxed text-gray-500">{getConfounderDescription(type)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const OliveYoungSnapshotTable: React.FC<{ snapshots: OliveYoungProductSnapshot[] }> = ({ snapshots }) => {
  const sorted = useMemo(
    () => [...snapshots].sort((a, b) => new Date(b.observedAt).getTime() - new Date(a.observedAt).getTime()),
    [snapshots]
  );

  if (sorted.length === 0) {
    return (
      <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 text-center shadow-sm">
        <PackageCheck className="mx-auto h-9 w-9 text-gray-300" />
        <p className="mt-3 text-sm font-black text-gray-500">아직 저장된 올리브영 스냅샷이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white shadow-sm overflow-hidden">
      <div className="border-b border-[#ecf3e7] p-6">
        <h3 className="text-2xl font-black text-gray-900">상품 스냅샷</h3>
        <p className="mt-1 text-sm font-bold text-gray-500">관측 시점별 공개 화면 스냅샷입니다. 최신순으로 표시합니다.</p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <caption className="sr-only">올리브영 상품 스냅샷 관측 테이블</caption>
          <thead>
            <tr className="bg-[#f7f8f6]">
              {['관측 시각', '상품', '카테고리', '랭킹', '랭킹 변화', '정상가', '할인가', '할인율', '리뷰 수', '평점', '배지', '데이터 품질'].map((header) => (
                <th key={header} scope="col" className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ecf3e7]">
            {sorted.map((snapshot) => {
              const rankDelta = normalizeRankDelta(snapshot.rank, snapshot.previousRank);
              return (
                <tr key={snapshot.id} className="align-top">
                  <td className="px-5 py-5 text-xs font-bold text-gray-500">{formatDateTime(snapshot.observedAt)}</td>
                  <td className="px-5 py-5">
                    <div className="flex min-w-[260px] items-center gap-3">
                      {snapshot.productImageUrl && (
                        <img loading="lazy" src={snapshot.productImageUrl} alt="" className="h-10 w-10 rounded-xl object-cover border border-[#ecf3e7]" />
                      )}
                      <div>
                        <p className="text-sm font-black text-gray-900 line-clamp-1">{snapshot.productName}</p>
                        <p className="text-[11px] font-bold text-gray-400">{snapshot.brandName ?? '브랜드 없음'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{snapshot.categoryName ?? '데이터 없음'}</td>
                  <td className="px-5 py-5 text-sm font-black text-gray-900">{formatRank(snapshot.rank)}</td>
                  <td className="px-5 py-5 text-sm font-black text-gray-900">{rankDelta.label}</td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{formatPriceKRW(snapshot.normalPrice)}</td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{formatPriceKRW(snapshot.salePrice)}</td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{formatPercent(snapshot.discountRate)}</td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{formatNumber(snapshot.reviewCount)}</td>
                  <td className="px-5 py-5 text-sm font-bold text-gray-600">{formatRating(snapshot.rating)}</td>
                  <td className="px-5 py-5"><BadgeList badges={snapshot.badges} /></td>
                  <td className="px-5 py-5"><DataQualityTooltip score={snapshot.dataQualityScore} reasons={snapshot.dataQualityReasons} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {sorted.map((snapshot) => (
          <article key={snapshot.id} className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-4">
            <p className="text-xs font-black text-[#6c9a4c]">{formatDateTime(snapshot.observedAt)}</p>
            <h4 className="mt-2 text-sm font-black text-gray-900">{snapshot.productName}</h4>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-bold text-gray-600">
              <p>랭킹 {formatRank(snapshot.rank)}</p>
              <p>리뷰 {formatNumber(snapshot.reviewCount)}</p>
              <p>할인율 {formatPercent(snapshot.discountRate)}</p>
              <p>평점 {formatRating(snapshot.rating)}</p>
            </div>
            <div className="mt-4"><BadgeList badges={snapshot.badges} /></div>
          </article>
        ))}
      </div>
    </section>
  );
};

function matchesMetricFilter(metric: OliveYoungMetricDefinition, filter: MetricFilter) {
  if (filter === '전체') return true;
  if (filter === '요약 노출') return shouldShowInSummary(metric);
  if (filter === '수집 가능') return metric.availability === 'PUBLIC_SNAPSHOT' || metric.availability === 'MANUAL_UPLOAD';
  if (filter === '권한 필요') return metric.availability === 'PARTNER_ONLY' || metric.availability === 'NOT_CONNECTED';
  if (filter === '계산 지표') return metric.availability === 'DERIVED';
  return metric.availability === 'UNSUPPORTED';
}

export const OliveYoungMetricCoverageMatrix: React.FC<{ metrics: OliveYoungMetricDefinition[] }> = ({ metrics }) => {
  const [filter, setFilter] = useState<MetricFilter>('요약 노출');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return metrics
      .filter((metric) => matchesMetricFilter(metric, filter))
      .filter((metric) => !keyword || metric.nameKo.toLowerCase().includes(keyword) || metric.id.toLowerCase().includes(keyword))
      .slice(0, expanded ? metrics.length : 18);
  }, [expanded, filter, metrics, query]);

  const grouped = filtered.reduce<Record<MetricDomain, OliveYoungMetricDefinition[]>>((acc, metric) => {
    acc[metric.domain] = [...(acc[metric.domain] ?? []), metric];
    return acc;
  }, {} as Record<MetricDomain, OliveYoungMetricDefinition[]>);
  const groupedEntries = Object.entries(grouped) as Array<[MetricDomain, OliveYoungMetricDefinition[]]>;

  return (
    <details className="group rounded-[2rem] border border-[#ecf3e7] bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900">올리브영 지표 수집 가능 여부</h3>
          <p className="mt-1 text-sm font-bold text-gray-500">무슨 데이터가 가능하고, 어떤 지표가 제한되는지 확인합니다.</p>
        </div>
        <ChevronDown className="h-5 w-5 text-[#6c9a4c] transition-transform group-open:rotate-180" />
      </summary>

      <div className="space-y-5 px-6 pb-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {metricFilterLabels.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-xl px-3 py-2 text-xs font-black transition-colors ${
                  filter === item ? 'bg-gray-900 text-[#6dec13]' : 'bg-[#f7f8f6] text-gray-500 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="relative block min-w-full xl:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c9a4c]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-xl border-none bg-[#f7f8f6] pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#6dec13]/50"
              placeholder="지표명 또는 ID 검색"
            />
          </label>
        </div>

        <div className="space-y-5">
          {groupedEntries.map(([domain, domainMetrics]) => (
            <section key={domain}>
              <h4 className="mb-3 text-sm font-black text-gray-900">{METRIC_DOMAIN_LABELS[domain]}</h4>
              <div className="overflow-x-auto rounded-2xl border border-[#ecf3e7]">
                <table className="w-full text-left">
                  <caption className="sr-only">{METRIC_DOMAIN_LABELS[domain]} 지표 수집 가능 여부</caption>
                  <thead className="bg-[#f7f8f6]">
                    <tr>
                      {['지표명', '영역', '수집 상태', '정확도', '데이터 유형', '화면 노출', '설명'].map((header) => (
                        <th key={header} scope="col" className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#6c9a4c]">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ecf3e7] bg-white">
                    {domainMetrics.map((metric) => (
                      <tr key={metric.id} className={metric.availability === 'UNSUPPORTED' ? 'opacity-60' : ''}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {(metric.availability === 'PARTNER_ONLY' || RESTRICTED_METRIC_IDS.includes(metric.id)) && <Lock className="h-3.5 w-3.5 text-amber-600" />}
                            <div>
                              <p className="text-sm font-black text-gray-900">{metric.nameKo}</p>
                              <p className="text-[10px] font-bold text-gray-400">{metric.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-gray-500">{METRIC_DOMAIN_LABELS[metric.domain]}</td>
                        <td className="px-4 py-4"><MetricAvailabilityBadge availability={metric.availability} /></td>
                        <td className="px-4 py-4"><AccuracyGradeBadge grade={metric.accuracyGrade} /></td>
                        <td className="px-4 py-4"><SourceTypeBadge sourceType={metric.sourceType} /></td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {shouldShowInSummary(metric) && <span className="rounded-lg bg-[#6dec13]/15 px-2 py-1 text-[10px] font-black text-[#2a4519]">요약</span>}
                            {metric.hiddenByDefault && <span className="rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-black text-gray-500">기본 숨김</span>}
                            {metric.isSensitive && <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700">민감 정보</span>}
                            {!shouldShowInSummary(metric) && !metric.hiddenByDefault && !metric.isSensitive && <span className="text-xs font-bold text-gray-400">상세</span>}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold leading-relaxed text-gray-500">{metric.tooltipKo ?? metric.descriptionKo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="rounded-xl bg-[#f7f8f6] px-4 py-3 text-xs font-black text-[#6c9a4c] hover:text-gray-900"
        >
          {expanded ? '요약 지표만 보기' : '전체 지표 보기'}
        </button>
      </div>
    </details>
  );
};

function TopicList({ title, items }: { title: string; items: { label: string; count?: number; ratio?: number; examples?: string[] }[] }) {
  return (
    <div className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-4">
      <h4 className="text-sm font-black text-gray-900">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.slice(0, 3).map((item) => (
          <span key={item.label} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-gray-700 border border-[#ecf3e7]">
            {item.label}
            {typeof item.ratio === 'number' ? ` ${(item.ratio * 100).toFixed(0)}%` : ''}
          </span>
        ))}
      </div>
      {items.some((item) => item.examples?.length) && (
        <details className="mt-3">
          <summary className="cursor-pointer text-[11px] font-black text-[#6c9a4c]">예시 표현 보기</summary>
          <div className="mt-2 space-y-1 text-xs font-bold leading-relaxed text-gray-500">
            {items.flatMap((item) => item.examples ?? []).slice(0, 2).map((example) => (
              <p key={example}>“{example}”</p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export const OliveYoungReviewVocPreview: React.FC<{ reviewVoc?: OliveYoungReviewVocSummary }> = ({ reviewVoc }) => {
  if (!reviewVoc) {
    return (
      <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black text-gray-900">리뷰 반응 미리보기</h3>
        <p className="mt-3 text-sm font-bold text-gray-500">리뷰 반응 데이터가 아직 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-[#ecf3e7] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 className="text-2xl font-black text-gray-900">리뷰 반응 미리보기</h3>
          <p className="mt-2 text-sm font-bold text-gray-500">
            리뷰 원문, 작성자, 이미지/동영상은 기본 화면에 노출하지 않고 만족/불만 요약만 표시합니다.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-[#f7f8f6] px-4 py-3">
            <p className="font-black text-gray-400">리뷰 수 변화</p>
            <p className="mt-1 font-black text-gray-900">{formatNumber(reviewVoc.reviewCountDelta)}</p>
          </div>
          <div className="rounded-2xl bg-[#f7f8f6] px-4 py-3">
            <p className="font-black text-gray-400">평점</p>
            <p className="mt-1 font-black text-gray-900">{formatRating(reviewVoc.rating)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <TopicList title="만족 요인 TOP 3" items={reviewVoc.positiveTopics} />
        <TopicList title="아쉬운 반응 TOP 3" items={reviewVoc.negativeTopics} />
        <TopicList title="구매 이유 TOP 3" items={reviewVoc.purchaseReasonTags} />
        <TopicList title="불만 요인 TOP 3" items={reviewVoc.complaintTags} />
      </div>

      <p className="mt-5 text-xs font-bold leading-relaxed text-gray-400">
        해석: 광고 메시지와 리뷰 표현이 일부 일치하는지 확인하되, 부정적인 리뷰 반응이 함께 관찰되는 경우 제품 사용감 리스크를 같이 점검합니다.
      </p>
    </section>
  );
};

export const OliveYoungRestrictedMetricsNotice: React.FC = () => (
  <section className="rounded-2xl border border-[#ecf3e7] bg-[#f7f8f6] p-5">
    <p className="text-xs font-bold leading-relaxed text-gray-500">
      정확한 판매량, 매출, 전환율, 주문 수는 올리브영 파트너/제휴 데이터 또는 광고주 제공 데이터가 없으면 표시하지 않습니다.
    </p>
  </section>
);

export const OliveYoungCommercePanel: React.FC<OliveYoungCommercePanelProps> = ({
  campaignId = 'campaign-youtube-01',
  productId = 'product-suncare-01',
  scenario,
}) => {
  const [state, setState] = useState<OliveYoungPanelState>('loading');
  const [analysis, setAnalysis] = useState<OliveYoungAnalysisViewModel | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;
    setState('loading');
    setErrorMessage(undefined);

    getOliveYoungAnalysis(campaignId, productId, scenario)
      .then((result) => {
        if (!mounted) return;
        setAnalysis(result);
        if (!result) {
          setState('empty');
          return;
        }
        const isPartial = !result.currentSnapshot || result.status.reliabilityLevel === 'LOW' || result.summary.confidence === 'UNKNOWN';
        setState(isPartial ? 'partial' : 'ready');
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        setState('error');
        setErrorMessage(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
      });

    return () => {
      mounted = false;
    };
  }, [campaignId, productId, scenario]);

  return (
    <section className="space-y-6 rounded-[2.5rem] border border-[#ecf3e7] bg-[#f7f8f6] p-5 lg:p-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#6dec13]/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#2a4519]">
            <ShoppingBag className="h-3.5 w-3.5" />
            OliveYoung Commerce
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900">올리브영 커머스 분석</h2>
          <p className="mt-2 max-w-4xl text-sm font-bold leading-relaxed text-gray-500">
            랭킹, 가격, 리뷰, 프로모션 변화를 기반으로 광고 이후 커머스 반응 신호를 확인합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-black text-[#6c9a4c] border border-[#ecf3e7]">
          <Tag className="h-4 w-4" />
          공개 화면 스냅샷 + 계산 지표
        </div>
      </div>

      {state === 'loading' && <OliveYoungLoadingSkeleton />}
      {state === 'empty' && <EmptyOliveYoungState />}
      {state === 'error' && <OliveYoungErrorState message={errorMessage} />}
      {(state === 'ready' || state === 'partial') && analysis && (
        <>
          {state === 'partial' && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-bold text-amber-800">
              일부 지표만 사용 가능합니다. 가능한 지표는 표시하고 없는 지표는 데이터 없음 또는 수집 제한으로 표시합니다.
            </div>
          )}
          <OliveYoungDataReliabilityBanner status={analysis.status} />
          <OliveYoungSummaryCards currentSnapshot={analysis.currentSnapshot} summary={analysis.summary} />
          <OliveYoungEffectSummary summary={analysis.summary} status={analysis.status} />
          <OliveYoungTimelineChart timeline={analysis.timeline} />
          <OliveYoungConfounderPanel confounders={analysis.summary.confounders} summary={analysis.summary} />
          <OliveYoungSnapshotTable snapshots={analysis.snapshots} />
          <OliveYoungReviewVocPreview reviewVoc={analysis.reviewVoc} />
          <OliveYoungMetricCoverageMatrix metrics={analysis.metricCatalog} />
          <OliveYoungRestrictedMetricsNotice />
        </>
      )}
    </section>
  );
};

export default OliveYoungCommercePanel;
