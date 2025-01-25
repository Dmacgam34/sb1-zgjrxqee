import { test, expect } from 'vitest';
import { getBusinessMetrics } from '../lib/analytics';
import { adjustInventory, runInventoryAudit } from '../lib/inventory';
import { generateSalesReport, generateInventoryReport, generateCustomerReport } from '../lib/reports';

test('business analytics', async () => {
  const metrics = await getBusinessMetrics();
  expect(metrics.revenue).toBeDefined();
  expect(metrics.orders).toBeDefined();
  expect(metrics.products).toBeDefined();
  expect(metrics.customers).toBeDefined();
});

test('inventory management', async () => {
  // Test inventory adjustment
  await adjustInventory({
    productId: 'test-1',
    quantity: 10,
    reason: 'restock',
    notes: 'Test restock'
  });

  // Test inventory audit
  const discrepancies = await runInventoryAudit();
  expect(Array.isArray(discrepancies)).toBe(true);
});

test('business reporting', async () => {
  const options = {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    groupBy: 'month' as const
  };

  // Test sales report
  const salesReport = await generateSalesReport(options);
  expect(Array.isArray(salesReport)).toBe(true);

  // Test inventory report
  const inventoryReport = await generateInventoryReport();
  expect(Array.isArray(inventoryReport)).toBe(true);

  // Test customer report
  const customerReport = await generateCustomerReport(options);
  expect(Array.isArray(customerReport)).toBe(true);
});