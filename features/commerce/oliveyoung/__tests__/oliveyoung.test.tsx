import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { OLIVE_YOUNG_METRIC_CATALOG, RESTRICTED_METRIC_IDS } from '../constants';
import { OLIVE_YOUNG_ANALYSIS_FIXTURES } from '../fixtures';
import {
  AccuracyGradeBadge,
  MetricAvailabilityBadge,
} from '../components/Badges';
import {
  EmptyOliveYoungState,
} from '../components/States';
import {
  OliveYoungDataReliabilityBanner,
  OliveYoungEffectSummary,
  OliveYoungReviewVocPreview,
  OliveYoungSummaryCards,
} from '../components/OliveYoungCommercePanel';
import {
  buildEffectSummaryText,
  hasForbiddenCommerceCopy,
  normalizeRankDelta,
  shouldShowInSummary,
} from '../utils';

describe('OliveYoung commerce helpers and UI policy', () => {
  it('MetricAvailabilityBadge renders Korean labels for every availability', () => {
    const html = renderToStaticMarkup(
      <div>
        <MetricAvailabilityBadge availability="PUBLIC_SNAPSHOT" />
        <MetricAvailabilityBadge availability="PARTNER_ONLY" />
        <MetricAvailabilityBadge availability="MANUAL_UPLOAD" />
        <MetricAvailabilityBadge availability="DERIVED" />
        <MetricAvailabilityBadge availability="UNSUPPORTED" />
        <MetricAvailabilityBadge availability="NOT_CONNECTED" />
      </div>
    );

    expect(html).toContain('공개 화면 스냅샷');
    expect(html).toContain('파트너 데이터 필요');
    expect(html).toContain('수동 업로드 필요');
    expect(html).toContain('계산 지표');
    expect(html).toContain('제공 불가');
    expect(html).toContain('연동 필요');
  });

  it('AccuracyGradeBadge renders A/B/C/D/X labels', () => {
    const html = renderToStaticMarkup(
      <div>
        <AccuracyGradeBadge grade="A" />
        <AccuracyGradeBadge grade="B" />
        <AccuracyGradeBadge grade="C" />
        <AccuracyGradeBadge grade="D" />
        <AccuracyGradeBadge grade="X" />
      </div>
    );

    expect(html).toContain('높음');
    expect(html).toContain('제한적 높음');
    expect(html).toContain('계산/추정');
    expect(html).toContain('낮음');
    expect(html).toContain('불가');
  });

  it('does not expose PARTNER_ONLY metrics in summary KPI rules', () => {
    const restricted = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) => metric.availability === 'PARTNER_ONLY');

    expect(restricted.length).toBeGreaterThan(0);
    expect(restricted.every((metric) => shouldShowInSummary(metric) === false)).toBe(true);
  });

  it('does not expose UNSUPPORTED metrics in summary KPI rules', () => {
    const unsupported = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) => metric.availability === 'UNSUPPORTED');

    expect(unsupported.length).toBeGreaterThan(0);
    expect(unsupported.every((metric) => shouldShowInSummary(metric) === false)).toBe(true);
  });

  it('keeps exact sales, revenue, conversion rate, and order count out of summary', () => {
    const metrics = OLIVE_YOUNG_METRIC_CATALOG.filter((metric) => RESTRICTED_METRIC_IDS.includes(metric.id));

    expect(metrics.map((metric) => metric.id).sort()).toEqual(RESTRICTED_METRIC_IDS.slice().sort());
    expect(metrics.every((metric) => shouldShowInSummary(metric) === false)).toBe(true);
  });

  it('normalizes rank delta because lower rank is better', () => {
    expect(normalizeRankDelta(18, 42)).toEqual({ absolute: 24, direction: 'up', label: '24위 상승' });
    expect(normalizeRankDelta(42, 18)).toEqual({ absolute: 24, direction: 'down', label: '24위 하락' });
    expect(normalizeRankDelta(18, 18)).toEqual({ absolute: 0, direction: 'flat', label: '변화 없음' });
  });

  it('promotion confounders avoid causal ad-effect wording', () => {
    const analysis = OLIVE_YOUNG_ANALYSIS_FIXTURES.ranking_up_with_promotion_confounders;
    const html = renderToStaticMarkup(
      <OliveYoungEffectSummary summary={analysis.summary} status={analysis.status} />
    );

    expect(html).toContain('커머스 연관 신호');
    expect(html).toContain('광고 단독 효과로 해석하지');
    expect(html).not.toContain('광고 때문에');
    expect(html).not.toContain('광고 효과 확정');
  });

  it('renders empty state when OliveYoung data is not connected', () => {
    const html = renderToStaticMarkup(<EmptyOliveYoungState />);

    expect(html).toContain('올리브영 데이터가 아직 연결되지 않았습니다');
    expect(html).toContain('수동 업로드 또는 데이터 연동');
  });

  it('renders available partial KPI values and missing value fallbacks', () => {
    const partial = OLIVE_YOUNG_ANALYSIS_FIXTURES.partial_data;
    const html = renderToStaticMarkup(
      <OliveYoungSummaryCards currentSnapshot={partial.currentSnapshot} summary={partial.summary} />
    );

    expect(html).toContain('리뷰 수 변화');
    expect(html).toContain('데이터 없음');
    expect(html).toContain('수집 제한');
  });

  it('does not expose review author or review media by default', () => {
    const analysis = OLIVE_YOUNG_ANALYSIS_FIXTURES.strong_signal_without_confounders;
    const html = renderToStaticMarkup(<OliveYoungReviewVocPreview reviewVoc={analysis.reviewVoc} />);

    expect(html).not.toContain('리뷰 작성자');
    expect(html).not.toContain('리뷰 이미지');
    expect(html).not.toContain('review_author_masked');
    expect(html).not.toContain('review_media');
  });

  it('fixture based default copy avoids forbidden commerce claims', () => {
    const analysis = OLIVE_YOUNG_ANALYSIS_FIXTURES.ranking_up_with_promotion_confounders;
    const copy = [
      buildEffectSummaryText(analysis.summary),
      ...analysis.summary.reasons,
      ...analysis.summary.warnings,
      ...analysis.status.warnings,
      ...analysis.status.limitations,
    ].join(' ');

    expect(hasForbiddenCommerceCopy(copy)).toBe(false);
  });

  it('DataReliabilityBanner states exact sales, revenue, and conversion are not included', () => {
    const analysis = OLIVE_YOUNG_ANALYSIS_FIXTURES.ranking_up_with_promotion_confounders;
    const html = renderToStaticMarkup(<OliveYoungDataReliabilityBanner status={analysis.status} />);

    expect(html).toContain('정확한 판매량/매출/전환율은 파트너 데이터 없이는 포함되지 않습니다');
  });
});
