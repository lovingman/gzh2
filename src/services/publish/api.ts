import { apiClient } from '../api/client';
import { 
  PublishStrategy, 
  PublishLayout, 
  PublishRecord,
  PublishStrategyFormData,
  ListParams,
  ListResponse
} from '../../types/publish';
import { ApiResponse } from '../../types/auth';

export const publishApi = {
  // 策略相关接口
  getStrategyList: async (params: ListParams): Promise<ApiResponse<ListResponse<PublishStrategy>>> => {
    const response = await apiClient.get('/api/publish/strategy/list', { params });
    return response.data;
  },

  addStrategy: async (data: PublishStrategyFormData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/publish/strategy/add', data);
    return response.data;
  },

  updateStrategy: async (id: number, data: PublishStrategyFormData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/publish/strategy/update', { strategy_id: id, ...data });
    return response.data;
  },

  deleteStrategy: async (id: number): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/publish/strategy/delete', { strategy_id: id });
    return response.data;
  },

  // 排版模板相关接口
  getLayoutList: async (params: ListParams): Promise<ApiResponse<ListResponse<PublishLayout>>> => {
    const response = await apiClient.get('/api/publish/layout/list', { params });
    return response.data;
  },

  // 发布记录相关接口
  getPublishList: async (params: ListParams): Promise<ApiResponse<ListResponse<PublishRecord>>> => {
    const response = await apiClient.get('/api/publish/record/list', { params });
    return response.data;
  }
};