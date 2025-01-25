import { test, expect } from 'vitest';
import { segmentCustomers, getCustomerSegment, getSegmentedPromotions } from '../../lib/customers';

test('customer segmentation', async () => {
  // Test customer segmentation
  await segmentCustomers();

  // Test getting customer segment
  const segment = await getCustomerSegment('test-user');
  expect(segment).toBeDefined();

  // Test getting segmented promotions
  const promotions = await getSegmentedPromotions('test-user');
  expect(promotions).toBeDefined();
});