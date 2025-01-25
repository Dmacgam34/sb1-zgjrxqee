import { loadStripe } from '@stripe/stripe-js';
import { getDB } from './db';
import type { CartItem } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createPaymentIntent(items: CartItem[], userId: string) {
  try {
    const db = await getDB();
    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create payment intent in local DB
    const paymentIntentId = crypto.randomUUID();
    await db.exec(
      `INSERT INTO payment_intents (id, user_id, amount, status)
       VALUES (?, ?, ?, 'requires_payment_method')`,
      [paymentIntentId, userId, totalAmount * 100]
    );

    return paymentIntentId;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function createOrder(
  userId: string,
  items: CartItem[],
  shippingAddress: any,
  paymentIntentId: string,
  paymentMethod: 'stripe' | 'paypal'
) {
  const db = await getDB();
  const orderId = crypto.randomUUID();
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await db.exec(
    `INSERT INTO orders (id, user_id, status, total_amount, shipping_address, payment_intent_id, payment_method)
     VALUES (?, ?, 'processing', ?, ?, ?, ?)`,
    [orderId, userId, totalAmount, JSON.stringify(shippingAddress), paymentIntentId, paymentMethod]
  );

  for (const item of items) {
    await db.exec(
      `INSERT INTO order_items (id, order_id, product_id, quantity, price_at_time)
       VALUES (?, ?, ?, ?, ?)`,
      [
        crypto.randomUUID(),
        orderId,
        item.product.id,
        item.quantity,
        item.product.price,
      ]
    );

    // Update inventory
    await db.exec(
      `UPDATE products 
       SET inventory_count = inventory_count - ? 
       WHERE id = ?`,
      [item.quantity, item.product.id]
    );
  }

  return orderId;
}

export async function savePaymentMethod(userId: string, paymentMethodId: string, last4: string, brand: string) {
  const db = await getDB();
  await db.exec(
    `INSERT INTO saved_payment_methods (id, user_id, payment_method_id, last4, brand)
     VALUES (?, ?, ?, ?, ?)`,
    [crypto.randomUUID(), userId, paymentMethodId, last4, brand]
  );
}

export async function getSavedPaymentMethods(userId: string) {
  const db = await getDB();
  return await db.execO(
    `SELECT * FROM saved_payment_methods WHERE user_id = ?`,
    [userId]
  );
}

export { stripePromise };