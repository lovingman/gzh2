import { useState, useCallback, useEffect } from 'react';
import { Article, ArticleListParams } from '../../types/article';
import { articleApi } from '../../services/article/api';

export function useArticles(initialParams: ArticleListParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ArticleListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await articleApi.getList(params);
      
      if (response.code === 200 && response.data) {
        setArticles(response.data.items);
        setTotal(response.data.total);
        setPages(response.data.pages);
      } else {
        setError(response.message || '获取文章列表失败');
      }
    } catch (err) {
      setError('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  }, [params]);

  // 添加 useEffect 在组件挂载和参数变化时获取数据
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    total,
    pages,
    currentPage: params.page || 1,
    params,
    setParams,
    refetch: fetchArticles
  };
}