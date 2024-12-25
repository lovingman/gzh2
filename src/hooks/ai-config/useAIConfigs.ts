import { useState, useEffect } from 'react';
import { AIConfig } from '../../types/ai-config';
import { aiConfigApi } from '../../services/ai-config/api';

export function useAIConfigs() {
  const [configs, setConfigs] = useState<AIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const response = await aiConfigApi.getList();
      if (response.code === 200 && response.data) {
        setConfigs(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('获取AI配置列表失败');
    } finally {
      setLoading(false);
    }
  };

  const deleteConfig = async (configId: number) => {
    try {
      const response = await aiConfigApi.delete(configId);
      if (response.code === 200) {
        await fetchConfigs();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  return {
    configs,
    loading,
    error,
    refetch: fetchConfigs,
    deleteConfig
  };
}