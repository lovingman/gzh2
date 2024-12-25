import { apiClient } from '../api';
import { ApiResponse, UserInfo } from '../../types/auth';

export const userApi = {
  getUserInfo: async (): Promise<ApiResponse<UserInfo>> => {
    const response = await apiClient.get('/api/user/info');
    return response.data;
  },
  
  updateUserInfo: async (data: Partial<UserInfo>): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/user/update', data);
    return response.data;
  }
};