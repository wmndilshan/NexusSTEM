import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  signIn: async (email, password) => {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ isLoading: false });
      return { error: error.message };
    }
    if (data.user) {
      const mockUser: User = {
        id: data.user.id,
        email: data.user.email ?? '',
        fullName: data.user.user_metadata?.full_name ?? 'User',
        phone: data.user.user_metadata?.phone ?? '',
        isB2B: false,
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    }
    return {};
  },

  signUp: async (email, password, fullName, phone) => {
    set({ isLoading: true });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    if (error) {
      set({ isLoading: false });
      return { error: error.message };
    }
    if (data.user) {
      const mockUser: User = {
        id: data.user.id,
        email: data.user.email ?? '',
        fullName,
        phone,
        isB2B: false,
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    }
    return {};
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
