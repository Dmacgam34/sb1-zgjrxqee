import { test, expect } from 'vitest';
import { supabase } from '../lib/supabase';

test('user authentication flow', async () => {
  // Test signup
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'testpassword123',
  });
  expect(signUpError).toBeNull();
  expect(signUpData.user).toBeDefined();

  // Test login
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123',
  });
  expect(signInError).toBeNull();
  expect(signInData.user).toBeDefined();

  // Test logout
  const { error: signOutError } = await supabase.auth.signOut();
  expect(signOutError).toBeNull();
});