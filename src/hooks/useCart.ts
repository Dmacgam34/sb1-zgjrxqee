import create from 'zustand';
import { supabase } from '../lib/supabase';

interface CartStore {
  items: CartItem[];
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
    const { user } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: product.id,
        quantity
      });

    if (!error) {
      set(state => ({
        items: [...state.items, { product, quantity }],
        itemCount: state.itemCount + quantity
      }));
    }
  },

  removeItem: async (productId) => {
    const { user } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('product_id', productId)
      .eq('user_id', user.id);

    if (!error) {
      set(state => ({
        items: state.items.filter(item => item.product.id !== productId),
        itemCount: state.itemCount - (state.items.find(item => item.product.id === productId)?.quantity || 0)
      }));
    }
  },

  updateQuantity: async (productId, quantity) => {
    const { user } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('product_id', productId)
      .eq('user_id', user.id);

    if (!error) {
      set(state => ({
        items: state.items.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
        itemCount: state.items.reduce((acc, item) => 
          acc + (item.product.id === productId ? quantity : item.quantity), 0)
      }));
    }
  },

  clearCart: () => set({ items: [], itemCount: 0 })
}));