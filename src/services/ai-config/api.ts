import { apiClient } from '../api/client';
import { AIConfig, AIConfigFormData, UpdateAIConfigData } from '../../types/ai-config';
import { ApiResponse } from '../../types/auth';

export const aiConfigApi = {
  getList: async (): Promise<ApiResponse<AIConfig[]>> => {
    const response = await apiClient.get('/api/setting/ai_config/list');
    return response.data;
  },

  getById: async (configId: number): Promise<ApiResponse<AIConfig>> => {
    const response = await apiClient.get(`/api/setting/ai_config/${configId}`);
    return response.data;
  },

  add: async (data: AIConfigFormData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/setting/ai_config/add', data);
    return response.data;
  },

  update: async (data: UpdateAIConfigData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/setting/ai_config/update', data);
    return response.data;
  },

  delete: async (configId: number): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/setting/ai_config/delete', { config_id: configId });
    return response.data;
  },
};