import { getDB } from './db';

interface ReportOptions {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month';
}

export async function generateSalesReport(options: ReportOptions) {
  const db = await getDB();
  
  const groupByClause = {
    day: "strftime('%Y-%m-%d', created_at)",
    week: "strftime('%Y-%W', created_at)",
    month: "strftime('%Y-%m', created_at)"
  }[options.groupBy || 'day'];

  return await db.execO(`
    SELECT 
      ${groupByClause} as period,
      COUNT(*) as order_count,
      SUM(total_amount) as revenue,
      AVG(total_amount) as average_order_value,
      COUNT(DISTINCT user_id) as unique_customers
    FROM orders
    WHERE 
      created_at BETWEEN ? AND ?
      AND status != 'cancelled'
    GROUP BY ${groupByClause}
    ORDER BY period ASC
  `, [options.startDate, options.endDate]);
}

export async function generateInventoryReport() {
  const db = await getDB();
  
  return await db.execO(`
    SELECT 
      p.id,
      p.name,
      p.inventory_count,
      p.low_stock_threshold,
      (
        SELECT COUNT(*)
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE 
          oi.product_id = p.id
          AND o.created_at >= datetime('now', '-30 days')
          AND o.status != 'cancelled'
      ) as monthly_sales,
      ROUND(
        CAST(p.inventory_count AS FLOAT) / NULLIF(
          (
            SELECT AVG(daily_sales)
            FROM (
              SELECT 
                COUNT(*) as daily_sales
              FROM order_items oi
              JOIN orders o ON oi.order_id = o.id
              WHERE 
                oi.product_id = p.id
                AND o.created_at >= datetime('now', '-30 days')
                AND o.status != 'cancelled'
              GROUP BY date(o.created_at)
            )
          ), 0
        ), 1
      ) as days_of_inventory
    FROM products p
    ORDER BY days_of_inventory ASC
  `);
}

export async function generateCustomerReport(options: ReportOptions) {
  const db = await getDB();
  
  return await db.execO(`
    WITH customer_orders AS (
      SELECT 
        user_id,
        COUNT(*) as order_count,
        SUM(total_amount) as total_spent,
        MIN(created_at) as first_order,
        MAX(created_at) as last_order
      FROM orders
      WHERE created_at BETWEEN ? AND ?
      GROUP BY user_id
    )
    SELECT 
      u.email,
      u.full_name,
      co.order_count,
      co.total_spent,
      co.first_order,
      co.last_order,
      ROUND(co.total_spent / co.order_count, 2) as average_order_value,
      JULIANDAY(co.last_order) - JULIANDAY(co.first_order) as customer_lifetime_days
    FROM customer_orders co
    JOIN users u ON co.user_id = u.id
    ORDER BY co.total_spent DESC
  `, [options.startDate, options.endDate]);
}