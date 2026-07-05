import { describe, expect, it } from 'vitest';
import {
  LEADING_PLATFORMS,
  buildDemandSummaryText,
  calculateDemandSignalScore,
  getDemandSignalBand,
  getPlatformDemandModel,
} from '../platformDemand';

describe('platform demand signal models', () => {
  it('defines a demand model for every leading platform', () => {
    expect(LEADING_PLATFORMS.map((platform) => getPlatformDemandModel(platform).scoreName)).toEqual([
      'YouTube Demand Signal Score',
      'Instagram Purchase Intent Score',
      'Meta Paid Response Quality Score',
      'TikTok Viral Demand Signal Score',
    ]);
  });

  it('uses purchase intent comments as the highest weighted YouTube signal', () => {
    const youtube = getPlatformDemandModel('YouTube');
    const purchaseIntent = youtube.metrics.find((metric) => metric.id === 'purchase_intent_comment_rate');
    const maxWeight = Math.max(...youtube.metrics.map((metric) => metric.weight));

    expect(purchaseIntent?.weight).toBe(maxWeight);
    expect(purchaseIntent?.formula).toContain('구매의도 댓글 수');
  });

  it('uses save, share, and profile/link actions for Instagram', () => {
    const instagram = getPlatformDemandModel('Instagram');
    const metricIds = instagram.metrics.map((metric) => metric.id);

    expect(metricIds).toContain('save_intent_rate');
    expect(metricIds).toContain('share_recommendation_rate');
    expect(metricIds).toContain('profile_link_action_rate');
    expect(instagram.publicFallback?.reliabilityLabel).toBe('낮음~중간');
  });

  it('maps scores to the agreed interpretation bands', () => {
    expect(getDemandSignalBand(80).label).toBe('강한 수요 신호');
    expect(getDemandSignalBand(60).label).toBe('중간 이상 수요 신호');
    expect(getDemandSignalBand(40).label).toBe('관심은 있으나 구매 검토 신호 약함');
    expect(getDemandSignalBand(39).label).toBe('수요 신호 약함');
  });

  it('subtracts negative barrier penalty from the weighted score', () => {
    const youtube = getPlatformDemandModel('YouTube');
    const withoutPenalty = calculateDemandSignalScore(youtube.metrics);

    expect(withoutPenalty - youtube.score).toBe(youtube.negativeBarrierPenalty?.value);
  });

  it('keeps demand summary wording as signal interpretation, not causal sales proof', () => {
    const summary = buildDemandSummaryText(getPlatformDemandModel('YouTube'));

    expect(summary).toContain('수요 신호');
    expect(summary).not.toContain('판매 증가');
    expect(summary).not.toContain('구매 증가');
    expect(summary).not.toContain('광고 효과 확정');
  });
});
