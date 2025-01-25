import { test, expect } from 'vitest';
import { useCart } from '../hooks/useCart';

test('mystery box functionality', async () => {
  const cart = useCart.getState();
  
  const mysteryBox = {
    id: 'mystery-1',
    name: 'Test Mystery Box',
    price: 49.99,
    images: ['test.jpg'],
    category_id: 'mystery-box',
    inventory_count: 10,
    description: 'Test Mystery Box',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Test adding mystery box to cart
  await cart.addItem(mysteryBox, 1);
  expect(cart.items.length).toBe(1);
  expect(cart.items[0].product.id).toBe('mystery-1');
});