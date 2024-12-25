import { create } from 'zustand';
import { AuthState } from '../../types/auth';
import { parseJwt } from '../../utils/jwt';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAdmin: false,
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    set({ 
      token,
      isAdmin: payload.member_level === '管理员'
    });
  },
  setUser: (user) => {
    set({ user });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAdmin: false });
  },
}));