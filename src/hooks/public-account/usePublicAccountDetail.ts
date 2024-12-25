import { useState, useEffect } from 'react';
import { PublicAccount } from '../../types/public-account';
import { publicAccountApi } from '../../services/public-account/api';

export function usePublicAccountDetail(id: string | undefined) {
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await publicAccountApi.getById(parseInt(id));
        
        if (response.code === 200 && response.data) {
          setAccount(response.data);
        } else {
          setError(response.message || '获取公众号详情失败');
        }
      } catch (err) {
        setError('获取公众号详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetail();
  }, [id]);

  return { account, loading, error };
}