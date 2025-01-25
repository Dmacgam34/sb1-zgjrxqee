import { getDB } from './db';
import { sendLowStockAlert } from './notifications';

interface InventoryAdjustment {
  productId: string;
  quantity: number;
  reason: 'restock' | 'damage' | 'loss' | 'audit';
  notes?: string;
}

export async function adjustInventory(adjustment: InventoryAdjustment) {
  const db = await getDB();
  
  await db.exec(`
    INSERT INTO inventory_adjustments (
      id,
      product_id,
      quantity,
      reason,
      notes,
      created_at
    ) VALUES (?, ?, ?, ?, ?, datetime('now'))
  `, [
    crypto.randomUUID(),
    adjustment.productId,
    adjustment.quantity,
    adjustment.reason,
    adjustment.notes
  ]);

  await db.exec(`
    UPDATE products
    SET 
      inventory_count = inventory_count + ?,
      updated_at = datetime('now')
    WHERE id = ?
  `, [adjustment.quantity, adjustment.productId]);

  // Check if we need to send low stock alert
  const [product] = await db.execO(`
    SELECT * FROM products WHERE id = ?
  `, [adjustment.productId]);

  if (product.inventory_count <= product.low_stock_threshold) {
    await sendLowStockAlert(product.id);
  }
}

export async function getInventoryHistory(productId: string) {
  const db = await getDB();
  
  return await db.execO(`
    SELECT 
      ia.*,
      p.name as product_name
    FROM inventory_adjustments ia
    JOIN products p ON ia.product_id = p.id
    WHERE ia.product_id = ?
    ORDER BY ia.created_at DESC
  `, [productId]);
}

export async function runInventoryAudit() {
  const db = await getDB();
  
  const discrepancies = await db.execO(`
    SELECT 
      p.id,
      p.name,
      p.inventory_count as system_count,
      (
        SELECT SUM(quantity)
        FROM inventory_adjustments
        WHERE product_id = p.id
      ) as actual_count,
      ABS(p.inventory_count - (
        SELECT SUM(quantity)
        FROM inventory_adjustments
        WHERE product_id = p.id
      )) as difference
    FROM products p
    HAVING difference > 0
  `);

  return discrepancies;
}