import { test, expect } from 'vitest';
import { useCart } from '../hooks/useCart';

test('cart functionality', () => {
  const cart = useCart.getState();
  
  // Test adding item
  const testProduct = {
    id: 'test-1',
    name: 'Test Product',
    price: 29.99,
    images: ['test.jpg'],
    category_id: 'test-cat',
    inventory_count: 10,
    description: 'Test description',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  cart.addItem(testProduct, 1);
  expect(cart.items.length).toBe(1);
  expect(cart.itemCount).toBe(1);

  // Test updating quantity
  cart.updateQuantity('test-1', 2);
  expect(cart.items[0].quantity).toBe(2);
  expect(cart.itemCount).toBe(2);

  // Test removing item
  cart.removeItem('test-1');
  expect(cart.items.length).toBe(0);
  expect(cart.itemCount).toBe(0);
});