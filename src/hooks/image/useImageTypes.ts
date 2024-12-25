import { useState, useEffect } from 'react';
import { imageApi } from '../../services/image/api';

interface UseImageTypesReturn {
  imageTypes: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useImageTypes(): UseImageTypesReturn {
  const [imageTypes, setImageTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImageTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await imageApi.getImageTypes();
      
      if (response.code === 200) {
        setImageTypes(response.data);
      } else {
        setError(response.message || '获取图库类型失败');
        setImageTypes([]);
      }
    } catch (err) {
      setError('服务器内部错误，请稍后重试');
      setImageTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImageTypes();
  }, []);

  return {
    imageTypes,
    loading,
    error,
    refetch: fetchImageTypes
  };
}