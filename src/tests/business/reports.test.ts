import { test, expect } from 'vitest';
import { 
  generateSalesReport, 
  generateInventoryReport, 
  generateCustomerReport 
} from '../../lib/reports';

test('business reporting system', async () => {
  const dateRange = {
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  };

  // Test sales report
  const salesReport = await generateSalesReport({
    ...dateRange,
    groupBy: 'month'
  });
  expect(Array.isArray(salesReport)).toBe(true);
  expect(salesReport[0]).toHaveProperty('period');
  expect(salesReport[0]).toHaveProperty('revenue');
  expect(salesReport[0]).toHaveProperty('order_count');

  // Test inventory report
  const inventoryReport = await generateInventoryReport();
  expect(Array.isArray(inventoryReport)).toBe(true);
  expect(inventoryReport[0]).toHaveProperty('inventory_count');
  expect(inventoryReport[0]).toHaveProperty('monthly_sales');
  expect(inventoryReport[0]).toHaveProperty('days_of_inventory');

  // Test customer report
  const customerReport = await generateCustomerReport(dateRange);
  expect(Array.isArray(customerReport)).toBe(true);
  expect(customerReport[0]).toHaveProperty('total_spent');
  expect(customerReport[0]).toHaveProperty('average_order_value');
  expect(customerReport[0]).toHaveProperty('customer_lifetime_days');
});