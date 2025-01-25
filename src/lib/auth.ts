import { create } from 'zustand';
import { getDB } from './db';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, full_name?: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  signIn: async (email: string, password: string) => {
    const db = await getDB();
    const result = await db.execO<User[]>(`
      SELECT id, email, full_name
      FROM users
      WHERE email = ?
    `, [email]);
    
    if (result.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    set({ user: result[0] });
  },
  
  signUp: async (email: string, password: string, full_name?: string) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    
    await db.exec(`
      INSERT INTO users (id, email, full_name)
      VALUES (?, ?, ?)
    `, [id, email, full_name]);
    
    set({ user: { id, email, full_name } });
  },
  
  signOut: () => {
    set({ user: null });
  }
}));