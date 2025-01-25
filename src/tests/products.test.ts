import { test, expect } from 'vitest';
import { getProducts, getCategories } from '../lib/products';

test('product listing and filtering', async () => {
  // Test basic product listing
  const products = await getProducts();
  expect(Array.isArray(products)).toBe(true);

  // Test product filtering
  const filteredProducts = await getProducts({
    category: 'test-category',
    minPrice: 10,
    maxPrice: 100,
    sortBy: 'price-asc'
  });
  expect(Array.isArray(filteredProducts)).toBe(true);

  // Test categories
  const categories = await getCategories();
  expect(Array.isArray(categories)).toBe(true);
});