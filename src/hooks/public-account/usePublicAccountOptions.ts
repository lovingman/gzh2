import { useState, useEffect } from 'react';
import { publicAccountApi } from '../../services/public-account/api';

interface PublicAccountOption {
  value: number;
  label: string;
}

export function usePublicAccountOptions() {
  const [options, setOptions] = useState<PublicAccountOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await publicAccountApi.getList({ limit: 100 }); // Get all accounts
        if (response.code === 200 && response.data?.items) {
          const accountOptions = response.data.items
            .filter(account => account.status === '正常') // Only show active accounts
            .map(account => ({
              value: account.public_id,
              label: account.name
            }));
          setOptions(accountOptions);
        } else {
          setError(response.message || '获取公众号列表失败');
        }
      } catch (err) {
        setError('获取公众号列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { options, loading, error };
}