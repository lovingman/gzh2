import { useState, useCallback, useEffect } from 'react';
import { PublishRecord, ListParams } from '../../types/publish';
import { publishApi } from '../../services/publish/api';

export function usePublishRecords(initialParams: ListParams = {}) {
  const [records, setRecords] = useState<PublishRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ListParams>({
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
      const response = await publishApi.getPublishList(params);
      
      if (response.code === 200 && response.data) {
        setRecords(response.data.items || []);
        setTotal(response.data.total || 0);
        setPages(response.data.pages || 1);
      } else {
        setError(response.message || '获取发布记录列表失败');
        setRecords([]);
      }
    } catch (err) {
      setError('获取发布记录列表失败');
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