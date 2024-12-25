import { useState, useEffect } from 'react';
import { Article } from '../../types/article';
import { articleApi } from '../../services/article/api';

export function useArticleDetail(articleId: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await articleApi.getDetail(parseInt(articleId));
        
        if (response.code === 200 && response.data) {
          setArticle(response.data);
        } else {
          setError(response.message || '获取文章详情失败');
        }
      } catch (err) {
        setError('获取文章详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  return { article, loading, error };
}