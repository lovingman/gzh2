import { useState, useCallback, useEffect } from 'react';
import { Image, ImageListParams } from '../../types/image';
import { imageApi } from '../../services/image/api';

export function useImages(initialParams: ImageListParams = {}) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ImageListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await imageApi.getList(params);
      
      if (response.code === 200 && response.data) {
        setImages(response.data.items || []);
        setTotal(response.data.total || 0);
        setPages(response.data.pages || 1);
      } else {
        setError(response.message || '获取图片列表失败');
        setImages([]);
      }
    } catch (err) {
      setError('获取图片列表失败');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    total,
    pages,
    currentPage: params.page || 1,
    params,
    setParams,
    refetch: fetchImages
  };
}