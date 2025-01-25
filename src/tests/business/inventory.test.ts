import { test, expect } from 'vitest';
import { adjustInventory, getInventoryHistory, runInventoryAudit } from '../../lib/inventory';

test('inventory management system', async () => {
  // Test inventory adjustment
  await adjustInventory({
    productId: 'test-1',
    quantity: 10,
    reason: 'restock',
    notes: 'Test restock'
  });

  // Test negative adjustment
  await adjustInventory({
    productId: 'test-1',
    quantity: -5,
    reason: 'damage',
    notes: 'Damaged items'
  });

  // Test inventory history
  const history = await getInventoryHistory('test-1');
  expect(Array.isArray(history)).toBe(true);
  expect(history.length).toBeGreaterThan(0);
  expect(history[0]).toHaveProperty('quantity');
  expect(history[0]).toHaveProperty('reason');

  // Test inventory audit
  const discrepancies = await runInventoryAudit();
  expect(Array.isArray(discrepancies)).toBe(true);
  expect(discrepancies[0]).toHaveProperty('system_count');
  expect(discrepancies[0]).toHaveProperty('actual_count');
  expect(discrepancies[0]).toHaveProperty('difference');
});