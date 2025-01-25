import { supabase } from './supabase';
import type { Product } from '../types';

// Sample products data
const INITIAL_PRODUCTS = [
  {
    name: "Premium Wireless Earbuds",
    description: "High-quality wireless earbuds with active noise cancellation and premium sound quality.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"],
    category_id: "electronics",
    inventory_count: 50,
    sku: "EARBUDS-001",
    cost_price: 45.00,
    low_stock_threshold: 10,
    weight: 0.2,
    meta_title: "Premium Wireless Earbuds | DropStore",
    meta_description: "Experience premium sound quality with our wireless earbuds featuring active noise cancellation."
  },
  {
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this advanced smart fitness tracker.",
    price: 49.99,
    images: ["https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&w=800&q=80"],
    category_id: "electronics",
    inventory_count: 75,
    sku: "FITNESS-001",
    cost_price: 25.00,
    low_stock_threshold: 15,
    weight: 0.1,
    meta_title: "Smart Fitness Tracker | DropStore",
    meta_description: "Advanced fitness tracking for your active lifestyle."
  },
  {
    name: "Portable Power Bank",
    description: "High-capacity portable power bank for all your charging needs.",
    price: 29.99,
    images: ["https://images.unsplash.com/photo-1609592424109-dd9892f1b17d?auto=format&fit=crop&w=800&q=80"],
    category_id: "electronics",
    inventory_count: 100,
    sku: "POWER-001",
    cost_price: 15.00,
    low_stock_threshold: 20,
    weight: 0.3,
    meta_title: "Portable Power Bank | DropStore",
    meta_description: "Keep your devices charged on the go with our high-capacity power bank."
  }
];

export async function initializeProducts() {
  const { data: existingProducts, error: checkError } = await supabase
    .from('products')
    .select('id');

  if (checkError) {
    console.error('Error checking existing products:', checkError);
    return;
  }

  if (existingProducts.length === 0) {
    const { error: insertError } = await supabase
      .from('products')
      .insert(INITIAL_PRODUCTS.map(product => ({
        ...product,
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })));

    if (insertError) {
      console.error('Error inserting products:', insertError);
    }
  }
}

export async function getProducts(options: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest';
  search?: string;
  inStock?: boolean;
} = {}) {
  let query = supabase
    .from('products')
    .select('*');

  if (options.category) {
    query = query.eq('category_id', options.category);
  }

  if (options.minPrice !== undefined) {
    query = query.gte('price', options.minPrice);
  }

  if (options.maxPrice !== undefined) {
    query = query.lte('price', options.maxPrice);
  }

  if (options.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
  }

  if (options.inStock) {
    query = query.gt('inventory_count', 0);
  }

  switch (options.sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function updateProductInventory(id: string, quantity: number) {
  const { error } = await supabase
    .from('products')
    .update({ 
      inventory_count: quantity,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
}

export async function checkLowStock() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lte('inventory_count', supabase.raw('low_stock_threshold'));

  if (error) {
    console.error('Error checking low stock:', error);
    return [];
  }

  return data;
}