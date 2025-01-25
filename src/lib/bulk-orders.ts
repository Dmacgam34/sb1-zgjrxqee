import { getDB } from './db';
import { sendOrderConfirmation } from './notifications';
import { createPurchaseOrder } from './suppliers';

interface BulkOrder {
  orders: Array<{
    user_id: string;
    items: Array<{
      product_id: string;
      quantity: number;
    }>;
    shipping_address: any;
  }>;
}

export async function processBulkOrders(bulkOrder: BulkOrder) {
  const db = await getDB();
  const results = {
    successful: [] as string[],
    failed: [] as Array<{ orderId: string; error: string }>
  };

  // Start a transaction
  await db.exec('BEGIN TRANSACTION');

  try {
    for (const order of bulkOrder.orders) {
      try {
        // Create order
        const orderId = crypto.randomUUID();
        await db.exec(
          `INSERT INTO orders (id, user_id, status, shipping_address)
           VALUES (?, ?, 'processing', ?)`,
          [orderId, order.user_id, JSON.stringify(order.shipping_address)]
        );

        // Add order items
        for (const item of order.items) {
          await db.exec(
            `INSERT INTO order_items (id, order_id, product_id, quantity)
             VALUES (?, ?, ?, ?)`,
            [crypto.randomUUID(), orderId, item.product_id, item.quantity]
          );

          // Update inventory
          await db.exec(
            `UPDATE products 
             SET inventory_count = inventory_count - ?
             WHERE id = ?`,
            [item.quantity, item.product_id]
          );
        }

        // Send confirmation
        await sendOrderConfirmation(orderId);
        results.successful.push(orderId);

        // Check inventory levels and create purchase orders if needed
        await checkAndCreateRestockOrders();
      } catch (error) {
        results.failed.push({
          orderId: order.user_id,
          error: error.message
        });
      }
    }

    await db.exec('COMMIT');
  } catch (error) {
    await db.exec('ROLLBACK');
    throw error;
  }

  return results;
}

async function checkAndCreateRestockOrders() {
  const db = await getDB();
  const lowStockProducts = await db.execO(
    `SELECT p.*, s.id as supplier_id
     FROM products p
     JOIN suppliers s ON p.supplier_id = s.id
     WHERE p.inventory_count <= p.low_stock_threshold`
  );

  // Group products by supplier
  const supplierOrders = lowStockProducts.reduce((acc, product) => {
    if (!acc[product.supplier_id]) {
      acc[product.supplier_id] = [];
    }
    acc[product.supplier_id].push({
      id: product.id,
      quantity: product.restock_quantity,
      unit_cost: product.cost_price
    });
    return acc;
  }, {});

  // Create purchase orders for each supplier
  for (const [supplierId, products] of Object.entries(supplierOrders)) {
    await createPurchaseOrder(supplierId, products);
  }
}