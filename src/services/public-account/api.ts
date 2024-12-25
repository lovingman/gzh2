import { apiClient } from '../api/client';
import { 
  PublicAccount, 
  PublicAccountFormData, 
  UpdatePublicAccountData,
  PublicAccountListParams,
  PublicAccountListResponse
} from '../../types/public-account';
import { ApiResponse } from '../../types/auth';

export const publicAccountApi = {
  getList: async (params: PublicAccountListParams = {}): Promise<ApiResponse<PublicAccountListResponse>> => {
    const response = await apiClient.get('/api/public_account/list', { 
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search || ''
      }
    });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<PublicAccount>> => {
    const response = await apiClient.get(`/api/public_account/detail/${id}`);
    return response.data;
  },

  add: async (data: PublicAccountFormData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/public_account/add', data);
    return response.data;
  },

  update: async (data: UpdatePublicAccountData): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/public_account/update', data);
    return response.data;
  },

  delete: async (publicId: number): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/public_account/delete', { public_id: publicId });
    return response.data;
  },

  toggleStatus: async (publicId: number, status: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/public_account/toggle_status', { 
      public_id: publicId,
      status
    });
    return response.data;
  }
};