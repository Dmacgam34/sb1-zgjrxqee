import { getDB } from './db';

interface AnalyticsMetrics {
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
    yearToDate: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  products: {
    topSelling: Array<{
      id: string;
      name: string;
      sales: number;
      revenue: number;
    }>;
    lowStock: Array<{
      id: string;
      name: string;
      inventory: number;
      threshold: number;
    }>;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    churnRate: number;
  };
}

export async function getBusinessMetrics(): Promise<AnalyticsMetrics> {
  const db = await getDB();
  
  // Revenue metrics
  const revenue = await db.execO(`
    SELECT 
      SUM(CASE WHEN created_at >= datetime('now', '-1 day') THEN total_amount ELSE 0 END) as daily,
      SUM(CASE WHEN created_at >= datetime('now', '-7 days') THEN total_amount ELSE 0 END) as weekly,
      SUM(CASE WHEN created_at >= datetime('now', '-30 days') THEN total_amount ELSE 0 END) as monthly,
      SUM(CASE WHEN created_at >= datetime('now', 'start of year') THEN total_amount ELSE 0 END) as yearToDate
    FROM orders
    WHERE status != 'cancelled'
  `);

  // Order metrics
  const orders = await db.execO(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
    FROM orders
  `);

  // Product metrics
  const topSelling = await db.execO(`
    SELECT 
      p.id,
      p.name,
      COUNT(oi.id) as sales,
      SUM(oi.price_at_time * oi.quantity) as revenue
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.status != 'cancelled'
    GROUP BY p.id
    ORDER BY sales DESC
    LIMIT 10
  `);

  const lowStock = await db.execO(`
    SELECT 
      id,
      name,
      inventory_count as inventory,
      low_stock_threshold as threshold
    FROM products
    WHERE inventory_count <= low_stock_threshold
    ORDER BY inventory_count ASC
  `);

  // Customer metrics
  const customers = await db.execO(`
    WITH customer_stats AS (
      SELECT 
        COUNT(DISTINCT user_id) as total,
        COUNT(DISTINCT CASE WHEN created_at >= datetime('now', '-30 days') THEN user_id END) as new,
        COUNT(DISTINCT CASE WHEN created_at < datetime('now', '-30 days') THEN user_id END) as returning
      FROM orders
    )
    SELECT 
      total,
      new,
      returning,
      ROUND(CAST(new AS FLOAT) / CAST(total AS FLOAT) * 100, 2) as churn_rate
    FROM customer_stats
  `);

  return {
    revenue: revenue[0],
    orders: orders[0],
    products: {
      topSelling,
      lowStock
    },
    customers: customers[0]
  };
}