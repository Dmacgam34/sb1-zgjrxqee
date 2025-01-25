import { test, expect } from 'vitest';
import { createPaymentIntent, createOrder } from '../lib/stripe';

test('checkout process', async () => {
  const testItems = [{
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
  }];

  // Test payment intent creation
  const paymentIntentId = await createPaymentIntent(testItems, 'test-user');
  expect(paymentIntentId).toBeDefined();

  // Test order creation
  const orderId = await createOrder(
    'test-user',
    testItems,
    { address: '123 Test St' },
    paymentIntentId,
    'stripe'
  );
  expect(orderId).toBeDefined();
});