import { useCallback } from 'react';
import { useAuthStore } from '../../stores/auth';
import { LoginCredentials, LoginResponse } from '../../types/auth';
import { authApi } from '../../services/auth/api';

export function useAuth() {
  const { token, memberLevel, isAuthenticated, isAdmin, login, logout } = useAuthStore();

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response.code === 200 && response.data) {
        login(response);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    token,
    memberLevel,
    isAuthenticated,
    isAdmin,
    login: handleLogin,
    logout: handleLogout
  };
}