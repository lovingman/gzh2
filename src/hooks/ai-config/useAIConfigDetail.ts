import { useState, useEffect } from 'react';
import { AIConfig } from '../../types/ai-config';
import { aiConfigApi } from '../../services/ai-config/api';

export function useAIConfigDetail(configId: string | undefined) {
  const [config, setConfig] = useState<AIConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      if (!configId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await aiConfigApi.getById(parseInt(configId));
        
        if (response.code === 200 && response.data) {
          setConfig(response.data);
        } else {
          setError(response.message || '获取配置详情失败');
        }
      } catch (err) {
        setError('获取配置详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [configId]);

  return { config, loading, error };
}