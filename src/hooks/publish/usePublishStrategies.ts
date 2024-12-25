import { useState, useCallback, useEffect } from 'react';
import { PublishStrategy, ListParams } from '../../types/publish';
import { publishApi } from '../../services/publish/api';

export function usePublishStrategies(initialParams: ListParams = {}) {
  const [strategies, setStrategies] = useState<PublishStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchStrategies = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await publishApi.getStrategyList(params);
      
      if (response.code === 200 && response.data) {
        setStrategies(response.data.items || []);
        setTotal(response.data.total || 0);
        setPages(response.data.pages || 1);
      } else {
        setError(response.message || '获取发布策略列表失败');
        setStrategies([]);
      }
    } catch (err) {
      setError('获取发布策略列表失败');
      setStrategies([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  return {
    strategies,
    loading,
    error,
    total,
    pages,
    currentPage: params.page || 1,
    params,
    setParams,
    deleteStrategy: async (id: number): Promise<boolean> => {
      try {
        const response = await publishApi.deleteStrategy(id);
        if (response.code === 200) {
          await fetchStrategies();
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    refetch: fetchStrategies
  };
}