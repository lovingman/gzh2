import { apiClient } from '../api/client';
import { LoginCredentials, LoginResponse } from '../../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post('/api/user/login', credentials);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberLevel');
  }
};