import { DB } from '@vlcn.io/crsqlite';
import wasmUrl from '@vlcn.io/crsqlite-wasm/crsqlite.wasm?url';

let db: DB | null = null;

export async function initDB() {
  if (db) return db;
  
  const sqlite = await DB.load(wasmUrl);
  db = await sqlite.open(':memory:');
  
  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      shipping_address TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category_id TEXT REFERENCES categories(id),
      images TEXT,
      inventory_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'pending',
      total_amount REAL NOT NULL,
      shipping_address TEXT NOT NULL,
      payment_intent_id TEXT UNIQUE,
      payment_method TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT REFERENCES orders(id),
      product_id TEXT REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price_at_time REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT REFERENCES products(id),
      user_id TEXT REFERENCES users(id),
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      product_id TEXT REFERENCES products(id),
      quantity INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS payment_intents (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      amount INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS saved_payment_methods (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      payment_method_id TEXT NOT NULL,
      last4 TEXT NOT NULL,
      brand TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

export async function getDB() {
  if (!db) {
    await initDB();
  }
  return db!;
}