import { test, expect } from 'vitest';
import { calculateShippingRate } from '../../lib/shipping';

test('shipping calculations', async () => {
  const rate = await calculateShippingRate(2.5, 'US');
  expect(rate.total).toBeGreaterThan(0);
  expect(rate.estimated_days).toBeDefined();
});