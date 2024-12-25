import { useState, useEffect } from 'react';
import { PublicAccount } from '../../types/public-account';
import { publicAccountApi } from '../../services/public-account/api';

export function usePublicAccount(id?: string) {
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        const response = await publicAccountApi.getById(parseInt(id));
        if (response.code === 200 && response.data) {
          setAccount(response.data);
        } else {
          setError(response.message || '获取公众号详情失败');
        }
      } catch (err) {
        setError('获取公众号详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  return { account, loading, error };
}