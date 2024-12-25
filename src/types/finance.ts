export interface PointsRecord {
  record_id: number;
  user_id: number;
  points: number;
  status: '充值' | '消费' | '退款';
  created_at: string;
}

export interface PointsRecordListParams {
  page?: number;
  limit?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface PointsRecordListResponse {
  items: PointsRecord[];
  total: number;
  page: number;
  pages: number;
}