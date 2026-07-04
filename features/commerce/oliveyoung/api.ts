import { OLIVE_YOUNG_METRIC_CATALOG } from './constants';
import { DEFAULT_OLIVE_YOUNG_SCENARIO, OLIVE_YOUNG_ANALYSIS_FIXTURES } from './fixtures';
import type {
  OliveYoungAnalysisViewModel,
  OliveYoungDataSourceStatus,
  OliveYoungDerivedEffect,
  OliveYoungMetricDefinition,
  OliveYoungProductSnapshot,
  OliveYoungReviewVocSummary,
  OliveYoungScenarioId,
} from './types';

const fixtureEnabled = () => {
  const meta = import.meta as ImportMeta & { env?: { DEV?: boolean } };
  return meta.env?.DEV === true;
};

export async function getOliveYoungMetricCatalog(): Promise<OliveYoungMetricDefinition[]> {
  return OLIVE_YOUNG_METRIC_CATALOG;
}

export async function getOliveYoungAnalysis(
  _campaignId?: string,
  _productId?: string,
  scenario: OliveYoungScenarioId = DEFAULT_OLIVE_YOUNG_SCENARIO
): Promise<OliveYoungAnalysisViewModel | null> {
  if (!fixtureEnabled()) {
    return null;
  }

  return OLIVE_YOUNG_ANALYSIS_FIXTURES[scenario] ?? OLIVE_YOUNG_ANALYSIS_FIXTURES[DEFAULT_OLIVE_YOUNG_SCENARIO];
}

export async function getOliveYoungStatus(
  campaignId?: string,
  productId?: string
): Promise<OliveYoungDataSourceStatus | null> {
  const analysis = await getOliveYoungAnalysis(campaignId, productId);
  return analysis?.status ?? null;
}

export async function getOliveYoungProductSnapshots(productId?: string): Promise<OliveYoungProductSnapshot[]> {
  const analysis = await getOliveYoungAnalysis(undefined, productId);
  return analysis?.snapshots ?? [];
}

export async function getOliveYoungCampaignEffect(campaignId?: string): Promise<OliveYoungDerivedEffect | null> {
  const analysis = await getOliveYoungAnalysis(campaignId);
  return analysis?.summary ?? null;
}

export async function getOliveYoungReviewVocSummary(
  campaignId?: string,
  productId?: string
): Promise<OliveYoungReviewVocSummary | undefined> {
  const analysis = await getOliveYoungAnalysis(campaignId, productId);
  return analysis?.reviewVoc;
}
