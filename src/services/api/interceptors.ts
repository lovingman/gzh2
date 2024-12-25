import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { authApi } from '../auth/api';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const responseInterceptor = {
  success: (response: AxiosResponse) => response,
  error: async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await authApi.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
};