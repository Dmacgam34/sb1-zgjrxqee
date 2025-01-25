import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock Supabase client
import { supabase } from '../lib/supabase';
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null })
    }
  }
}));

// Mock DB
vi.mock('../lib/db', () => ({
  getDB: vi.fn().mockResolvedValue({
    exec: vi.fn().mockResolvedValue(true),
    execO: vi.fn().mockResolvedValue([])
  })
}));

beforeAll(() => {
  // Setup global test environment
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetModules();
});