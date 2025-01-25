/*
  # E-commerce Platform Schema

  1. New Tables
    - `profiles`
      - User profiles with shipping information
    - `products`
      - Product catalog with details and inventory
    - `categories`
      - Product categories
    - `orders`
      - Customer orders
    - `order_items`
      - Individual items in orders
    - `reviews`
      - Product reviews and ratings
    - `cart_items`
      - Shopping cart items

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure order management
*/

-- Create tables
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  shipping_address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id),
  images text[] DEFAULT array[]::text[],
  inventory_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  status text NOT NULL DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_intent_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  price_at_time decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  user_id uuid REFERENCES profiles(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create reviews for products they bought" ON reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM order_items
      JOIN orders ON orders.id = order_items.order_id
      WHERE orders.user_id = auth.uid()
      AND order_items.product_id = reviews.product_id
    )
  );

CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX products_category_id_idx ON products(category_id);
CREATE INDEX order_items_order_id_idx ON order_items(order_id);
CREATE INDEX reviews_product_id_idx ON reviews(product_id);
CREATE INDEX cart_items_user_id_idx ON cart_items(user_id);