import { test, expect } from 'vitest';
import { sendOrderConfirmation, sendLowStockAlert, sendShippingUpdate } from '../../lib/notifications';

test('notification system', async () => {
  // Test order confirmation
  await sendOrderConfirmation('order-1');

  // Test low stock alert
  await sendLowStockAlert('product-1');

  // Test shipping update
  await sendShippingUpdate('order-1', 'shipped');
});