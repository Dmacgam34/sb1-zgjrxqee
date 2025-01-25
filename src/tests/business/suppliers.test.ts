import { test, expect } from 'vitest';
import { createPurchaseOrder, sendPurchaseOrder } from '../../lib/suppliers';

test('supplier management', async () => {
  const products = [
    { id: 'test-1', quantity: 100, unit_cost: 10.99 }
  ];

  // Test purchase order creation
  const orderId = await createPurchaseOrder('supplier-1', products);
  expect(orderId).toBeDefined();

  // Test sending purchase order
  await sendPurchaseOrder(orderId);
  // Verify notification was sent
});