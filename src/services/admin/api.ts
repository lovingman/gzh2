import { apiClient } from '../api';
import { ApiResponse } from '../../types/auth';

export const adminApi = {
  // ... existing methods ...

  addAIConfig: async (configData: {
    config_type: string;
    api_key: string;
    model_name: string;
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/setting/ai_config/add', configData);
    return response.data;
  },

  deleteAIConfig: async (configId: number): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/setting/ai_config/delete', { config_id: configId });
    return response.data;
  },
};