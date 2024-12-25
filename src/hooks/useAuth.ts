import { create } from 'zustand';
import { parseJwt } from '../utils/jwt';
import { UserInfo } from '../types/auth';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAdmin: boolean;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAdmin: false,
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    set({ 
      token,
      isAdmin: payload.member_level === 'admin'
    });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAdmin: false });
  },
}));