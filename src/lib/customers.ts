import { getDB } from './db';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    min_orders?: number;
    min_spent?: number;
    last_order_within_days?: number;
    specific_categories?: string[];
  };
}

export async function segmentCustomers() {
  const db = await getDB();
  
  // VIP Customers
  await db.exec(`
    INSERT INTO customer_segments (user_id, segment_id)
    SELECT 
      u.id,
      'vip'
    FROM users u
    JOIN orders o ON u.id = o.user_id
    GROUP BY u.id
    HAVING 
      COUNT(o.id) >= 5 AND
      SUM(o.total_amount) >= 500
    ON CONFLICT (user_id) DO UPDATE
    SET segment_id = 'vip'
  `);

  // At-Risk Customers
  await db.exec(`
    INSERT INTO customer_segments (user_id, segment_id)
    SELECT 
      u.id,
      'at_risk'
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE 
      o.created_at < datetime('now', '-90 days')
      AND u.id NOT IN (SELECT user_id FROM customer_segments WHERE segment_id = 'vip')
    GROUP BY u.id
    ON CONFLICT (user_id) DO UPDATE
    SET segment_id = 'at_risk'
  `);

  // New Customers
  await db.exec(`
    INSERT INTO customer_segments (user_id, segment_id)
    SELECT 
      u.id,
      'new'
    FROM users u
    WHERE 
      u.created_at > datetime('now', '-30 days')
      AND u.id NOT IN (SELECT user_id FROM customer_segments)
    ON CONFLICT (user_id) DO UPDATE
    SET segment_id = 'new'
  `);
}

export async function getCustomerSegment(userId: string) {
  const db = await getDB();
  const [segment] = await db.execO(
    `SELECT segment_id FROM customer_segments WHERE user_id = ?`,
    [userId]
  );
  return segment?.segment_id || 'regular';
}

export async function getSegmentedPromotions(userId: string) {
  const segment = await getCustomerSegment(userId);
  
  const promotions = {
    vip: {
      discount: 0.15,
      freeShipping: true,
      exclusiveAccess: true
    },
    new: {
      discount: 0.10,
      freeShipping: false,
      welcomeGift: true
    },
    at_risk: {
      discount: 0.20,
      limitedTime: true
    },
    regular: {
      discount: 0.05
    }
  };

  return promotions[segment] || promotions.regular;
}