import { apiClient } from '../api/client';
import { ImageListParams, ImageListResponse, ImageTypesResponse } from '../../types/image';
import { ApiResponse } from '../../types/auth';

export const imageApi = {
  getList: async (params: ImageListParams = {}): Promise<ApiResponse<ImageListResponse>> => {
    const response = await apiClient.get('/api/image/list', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10
      }
    });
    return response.data;
  },

  getImageTypes: async (): Promise<ImageTypesResponse> => {
    try {
      const response = await apiClient.get('/api/image/types');
      return response.data;
    } catch (error) {
      // 处理500错误
      if (error.response?.status === 500) {
        return {
          code: 500,
          message: '服务器内部错误',
          data: []
        };
      }
      throw error;
    }
  }
};