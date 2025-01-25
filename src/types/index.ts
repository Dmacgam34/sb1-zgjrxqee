export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category_id: string;
  inventory_count: number;
  created_at: string;
  updated_at: string;
  sku: string;
  cost_price?: number;
  profit_margin?: number;
  low_stock_threshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  meta_title?: string;
  meta_description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  parent_id?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MysteryBox {
  id: string;
  name: string;
  price: number;
  value: string;
  image: string;
  items: string;
  theme: string;
  guarantee: string;
  features: string[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  box: string;
  comment: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
  date?: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  payment_terms?: string;
  lead_time?: number;
  minimum_order?: number;
  preferred?: boolean;
  rating?: number;
}

export interface PurchaseOrder {
  id: string;
  supplier_id: string;
  status: 'draft' | 'sent' | 'confirmed' | 'received';
  total_amount: number;
  payment_status: 'pending' | 'partial' | 'paid';
  expected_delivery: string;
  items: Array<{
    product_id: string;
    quantity: number;
    unit_cost: number;
  }>;
}

export interface CustomerSegment {
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

export interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms';
  segment_id: string;
  content: string;
  schedule: {
    start: string;
    end?: string;
    frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  metrics?: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
}