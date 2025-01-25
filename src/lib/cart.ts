import { create } from 'zustand';
import { getDB } from './db';
import { useAuth } from './auth';
import type { Product } from '../types';

interface CartStore {
  items: Array<{ product: Product; quantity: number }>;
  itemCount: number;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  itemCount: 0,
  
  addItem: async (product, quantity) => {
    const user = useAuth.getState().user;
    if (!user) return;
    
    const db = await getDB();
    await db.exec(`
      INSERT INTO cart_items (id, user_id, product_id, quantity)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET quantity = quantity + excluded.quantity
    `, [crypto.randomUUID(), user.id, product.id, quantity]);
    
    set(state => ({
      items: [...state.items, { product, quantity }],
      itemCount: state.itemCount + quantity
    }));
  },
  
  removeItem: async (productId) => {
    const user = useAuth.getState().user;
    if (!user) return;
    
    const db = await getDB();
    await db.exec(`
      DELETE FROM cart_items
      WHERE user_id = ? AND product_id = ?
    `, [user.id, productId]);
    
    set(state => ({
      items: state.items.filter(item => item.product.id !== productId),
      itemCount: state.itemCount - (state.items.find(item => item.product.id === productId)?.quantity || 0)
    }));
  },
  
  updateQuantity: async (productId, quantity) => {
    const user = useAuth.getState().user;
    if (!user) return;
    
    const db = await getDB();
    await db.exec(`
      UPDATE cart_items
      SET quantity = ?
      WHERE user_id = ? AND product_id = ?
    `, [quantity, user.id, productId]);
    
    set(state => ({
      items: state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
      itemCount: state.items.reduce((acc, item) => 
        acc + (item.product.id === productId ? quantity : item.quantity), 0)
    }));
  },
  
  clearCart: () => set({ items: [], itemCount: 0 })
}));