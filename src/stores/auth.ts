import { create } from 'zustand';
import { AuthStore, LoginResponse } from '../types/auth';

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  memberLevel: localStorage.getItem('memberLevel') as '管理员' | '普通' | null,
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: localStorage.getItem('memberLevel') === '管理员',

  login: (response: LoginResponse) => {
    if (response.code === 200 && response.data) {
      const { token, member_level } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('memberLevel', member_level);
      
      set({
        token,
        memberLevel: member_level,
        isAuthenticated: true,
        isAdmin: member_level === '管理员'
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberLevel');
    set({
      token: null,
      memberLevel: null,
      isAuthenticated: false,
      isAdmin: false
    });
  },

  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberLevel');
    set({
      token: null,
      memberLevel: null,
      isAuthenticated: false,
      isAdmin: false
    });
  }
}));