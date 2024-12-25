import { useState, useCallback, useEffect } from 'react';
import { PublicAccount, PublicAccountListParams } from '../../types/public-account';
import { publicAccountApi } from '../../services/public-account/api';

export function usePublicAccounts(initialParams: PublicAccountListParams = {}) {
  const [accounts, setAccounts] = useState<PublicAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params, setParams] = useState<PublicAccountListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });
  const [total, setTotal] = useState(0);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await publicAccountApi.getList(params);
      if (response.code === 200 && response.data) {
        setAccounts(response.data.items || []);
        setTotal(response.data.total || 0);
      } else {
        setError(response.message || '获取数据失败');
        setAccounts([]);
        setTotal(0);
      }
    } catch (err) {
      setError('获取公众号列表失败');
      setAccounts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const deleteAccount = async (publicId: number): Promise<boolean> => {
    try {
      const response = await publicAccountApi.delete(publicId);
      if (response.code === 200) {
        await fetchAccounts();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const toggleStatus = async (publicId: number, status: string): Promise<boolean> => {
    try {
      const response = await publicAccountApi.toggleStatus(publicId, status);
      if (response.code === 200) {
        await fetchAccounts();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const totalPages = Math.max(1, Math.ceil(total / (params.limit || 10)));

  return {
    accounts,
    loading,
    error,
    total,
    totalPages,
    currentPage: params.page || 1,
    params,
    setParams,
    deleteAccount,
    toggleStatus,
    refetch: fetchAccounts
  };
}