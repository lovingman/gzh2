import { useState, useCallback, useEffect } from 'react';
import { PublishLayout, ListParams } from '../../types/publish';
import { publishApi } from '../../services/publish/api';

export function usePublishLayouts(initialParams: ListParams = {}) {
  const [layouts, setLayouts] = useState<PublishLayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchLayouts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await publishApi.getLayoutList(params);
      
      if (response.code === 200 && response.data) {
        setLayouts(response.data.items || []);
        setTotal(response.data.total || 0);
        setPages(response.data.pages || 1);
      } else {
        setError(response.message || '获取排版模板列表失败');
        setLayouts([]);
      }
    } catch (err) {
      setError('获取排版模板列表失败');
      setLayouts([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLayouts();
  }, [fetchLayouts]);

  return {
    layouts,
    loading,
    error,
    total,
    pages,
    currentPage: params.page || 1,
    params,
    setParams,
    refetch: fetchLayouts
  };
}