import { test, expect } from 'vitest';
import { createPaymentIntent, processRefund, getPaymentMethods } from '../../lib/stripe';

test('payment processing system', async () => {
  // Test payment intent creation
  const paymentIntent = await createPaymentIntent([{
    product: {
      id: 'test-1',
      name: 'Test Product',
      price: 29.99,
      images: ['test.jpg'],
      category_id: 'test-cat',
      inventory_count: 10,
      description: 'Test description',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    quantity: 1
  }], 'test-user');
  expect(paymentIntent).toBeDefined();

  // Test refund processing
  const refund = await processRefund('order-1', {
    amount: 29.99,
    reason: 'customer_request'
  });
  expect(refund.status).toBe('succeeded');

  // Test saved payment methods
  const paymentMethods = await getPaymentMethods('test-user');
  expect(Array.isArray(paymentMethods)).toBe(true);
  expect(paymentMethods[0]).toHaveProperty('last4');
  expect(paymentMethods[0]).toHaveProperty('brand');
});