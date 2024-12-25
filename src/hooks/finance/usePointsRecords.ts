import { useState, useCallback, useEffect } from 'react';
import { PointsRecord, PointsRecordListParams } from '../../types/finance';
import { financeApi } from '../../services/finance/api';

export function usePointsRecords(initialParams: PointsRecordListParams = {}) {
  const [records, setRecords] = useState<PointsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<PointsRecordListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await financeApi.getPointsRecord(params);
      
      if (response.code === 200 && response.data) {
        setRecords(response.data.items || []);
        setTotal(response.data.total || 0);
        setPages(response.data.pages || 1);
      } else {
        setError(response.message || '获取积分记录失败');
        setRecords([]);
      }
    } catch (err) {
      setError('获取积分记录失败');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    total,
    pages,
    currentPage: params.page || 1,
    params,
    setParams,
    refetch: fetchRecords
  };
}