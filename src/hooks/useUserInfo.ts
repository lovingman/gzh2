import { useEffect, useState } from 'react';
import { userApi } from '../services/user/api';
import { UserInfo } from '../types/auth';

export function useUserInfo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userApi.getUserInfo();
      if (response.code === 200 && response.data) {
        setUserInfo(response.data);
      } else {
        setError(response.message || '获取用户信息失败');
      }
    } catch (err) {
      setError('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { userInfo, loading, error, refetch: fetchUserInfo };
}