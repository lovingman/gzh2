import { apiClient } from '../api/client';
import { ApiResponse } from '../../types/auth';
import { PointsRecordListParams, PointsRecordListResponse } from '../../types/finance';

export const financeApi = {
  getPointsRecord: async (params: PointsRecordListParams = {}): Promise<ApiResponse<PointsRecordListResponse>> => {
    const response = await apiClient.get('/api/finance/points_record', { params });
    return response.data;
  },

  rechargePoints: async (points: number): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/finance/points_recharge', { points });
    return response.data;
  }
};