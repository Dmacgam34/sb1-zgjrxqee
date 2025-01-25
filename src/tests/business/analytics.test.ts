import { test, expect } from 'vitest';
import { getBusinessMetrics } from '../../lib/analytics';

test('business analytics metrics', async () => {
  const metrics = await getBusinessMetrics();

  // Test revenue metrics
  expect(metrics.revenue.daily).toBeGreaterThanOrEqual(0);
  expect(metrics.revenue.weekly).toBeGreaterThanOrEqual(0);
  expect(metrics.revenue.monthly).toBeGreaterThanOrEqual(0);
  expect(metrics.revenue.yearToDate).toBeGreaterThanOrEqual(0);

  // Test order metrics
  expect(metrics.orders.total).toBeGreaterThanOrEqual(0);
  expect(metrics.orders.pending).toBeGreaterThanOrEqual(0);
  expect(metrics.orders.completed).toBeGreaterThanOrEqual(0);
  expect(metrics.orders.cancelled).toBeGreaterThanOrEqual(0);

  // Test product metrics
  expect(Array.isArray(metrics.products.topSelling)).toBe(true);
  expect(Array.isArray(metrics.products.lowStock)).toBe(true);

  // Test customer metrics
  expect(metrics.customers.total).toBeGreaterThanOrEqual(0);
  expect(metrics.customers.new).toBeGreaterThanOrEqual(0);
  expect(metrics.customers.returning).toBeGreaterThanOrEqual(0);
  expect(metrics.customers.churnRate).toBeGreaterThanOrEqual(0);
});