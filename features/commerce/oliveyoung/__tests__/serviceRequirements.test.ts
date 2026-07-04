import { describe, expect, it } from 'vitest';
import {
  getDuplicateRequirementIds,
  SERVICE_REQUIREMENT_DOMAINS,
  SERVICE_REQUIREMENTS,
} from '../../../../serviceRequirementCatalog';
import { SERVICE_MOCK_PREVIEWS } from '../../../../serviceMockData';

describe('service requirement catalog', () => {
  it('contains the requested service domains', () => {
    expect(SERVICE_REQUIREMENT_DOMAINS.map((domain) => domain.id)).toEqual([
      'WORKSPACE',
      'PRODUCT',
      'BRAND',
      'KEYWORD',
      'RANK',
      'REPORT',
      'ALERT',
    ]);
  });

  it('keeps all requirement rows in the frontend catalog', () => {
    expect(SERVICE_REQUIREMENTS.length).toBeGreaterThanOrEqual(75);
  });

  it('detects duplicated requirement IDs from the source plan', () => {
    const duplicateIds = getDuplicateRequirementIds();

    expect(duplicateIds.has('WORKSPACE-006')).toBe(true);
    expect(duplicateIds.has('KEYWORD-008')).toBe(true);
    expect(duplicateIds.has('REPORT-003')).toBe(true);
  });

  it('provides visible mock preview data for every service domain', () => {
    for (const domain of SERVICE_REQUIREMENT_DOMAINS) {
      const preview = SERVICE_MOCK_PREVIEWS[domain.id];

      expect(preview.title).toBeTruthy();
      expect(preview.metrics.length).toBeGreaterThanOrEqual(3);
      expect(preview.rows.length).toBeGreaterThanOrEqual(3);
      expect(preview.notes.length).toBeGreaterThanOrEqual(1);
    }
  });
});
