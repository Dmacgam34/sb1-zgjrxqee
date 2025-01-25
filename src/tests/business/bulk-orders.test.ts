import { test, expect } from 'vitest';
import { processBulkOrders } from '../../lib/bulk-orders';

test('bulk order processing', async () => {
  const bulkOrder = {
    orders: [
      {
        user_id: 'user-1',
        items: [{ product_id: 'product-1', quantity: 2 }],
        shipping_address: { address: '123 Test St' }
      }
    ]
  };

  const results = await processBulkOrders(bulkOrder);
  expect(results.successful.length).toBeGreaterThan(0);
  expect(results.failed.length).toBe(0);
});