import { describe, expect, it } from 'vitest';
import { commerceFeatureCards } from '../../../../brandDashPlan';
import { commerceFeaturePageContent } from '../../../../commerceFeaturePageContent';

function flattenText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(flattenText).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(flattenText).join(' ');
  return '';
}

describe('commerce feature detail pages', () => {
  it('has concrete page content for all six commerce features', () => {
    const commerceIds = commerceFeatureCards.map((feature) => feature.id);

    expect(commerceIds).toHaveLength(6);
    expect(commerceIds.every((id) => commerceFeaturePageContent[id])).toBe(true);
  });

  it('separates new review count from review response meaning', () => {
    const marketResponse = commerceFeaturePageContent['market-trend-voc'];
    const ownedReview = commerceFeaturePageContent['owned-review-analysis'];

    expect(flattenText(marketResponse)).toContain('신규 리뷰 수');
    expect(flattenText(marketResponse)).toContain('리뷰 반응');
    expect(flattenText(ownedReview)).toContain('신규 리뷰 수');
    expect(flattenText(ownedReview)).toContain('만족/불만 비중');
  });

  it('avoids ambiguous old review and conversion wording in customer-facing commerce content', () => {
    const copy = flattenText(commerceFeaturePageContent);

    expect(copy).not.toContain('리뷰 증가');
    expect(copy).not.toContain('구매 전환');
    expect(copy).not.toContain('긍정 리뷰');
    expect(copy).not.toContain('부정 토픽');
    expect(copy).not.toContain('고객 언어');
  });
});
