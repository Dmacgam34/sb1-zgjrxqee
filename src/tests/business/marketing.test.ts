import { test, expect } from 'vitest';
import type { MarketingCampaign } from '../../types';

test('marketing campaign system', async () => {
  const campaign: MarketingCampaign = {
    id: 'test-campaign',
    name: 'Test Campaign',
    type: 'email',
    segment_id: 'vip-customers',
    content: 'Test content',
    schedule: {
      start: new Date().toISOString(),
      frequency: 'once'
    },
    status: 'draft'
  };

  // Test campaign creation
  const createdCampaign = await createCampaign(campaign);
  expect(createdCampaign.id).toBeDefined();
  expect(createdCampaign.status).toBe('draft');

  // Test campaign scheduling
  const scheduledCampaign = await scheduleCampaign(campaign.id);
  expect(scheduledCampaign.status).toBe('scheduled');

  // Test campaign metrics
  const metrics = await getCampaignMetrics(campaign.id);
  expect(metrics).toHaveProperty('sent');
  expect(metrics).toHaveProperty('opened');
  expect(metrics).toHaveProperty('clicked');
  expect(metrics).toHaveProperty('converted');
});