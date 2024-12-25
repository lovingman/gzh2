import { api } from './api';
import { LoginCredentials, ApiResponse } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<ApiResponse> => {
  const response = await api.post('/api/user/login', credentials);
  return response.data;
};