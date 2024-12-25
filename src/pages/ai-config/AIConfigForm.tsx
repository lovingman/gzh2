import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { aiConfigApi } from '../../services/ai-config/api';
import { AIConfigFormData } from '../../types/ai-config';
import { CONFIG_TYPE_OPTIONS } from '../../constants/ai-config';
import { useAIConfigDetail } from '../../hooks/ai-config/useAIConfigDetail';

export default function AIConfigForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { config, loading: fetchLoading, error: fetchError } = useAIConfigDetail(id);
  const isEdit = !!id;

  const [formData, setFormData] = useState<AIConfigFormData>({
    config_type: '',
    api_key: '',
    model_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (config) {
      setFormData({
        config_type: config.config_type,
        api_key: config.api_key,
        model_name: config.model_name
      });
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isEdit
        ? await aiConfigApi.update({ ...formData, config_id: parseInt(id!) })
        : await aiConfigApi.add(formData);

      if (response.code === 200) {
        navigate('/settings/ai');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('保存失败');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-500">{fetchError}</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? '编辑AI配置' : '新增AI配置'}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            id="config_type"
            label="配置类型"
            icon={Settings}
            required
            value={formData.config_type}
            onChange={(e) => setFormData(prev => ({ ...prev, config_type: e.target.value }))}
            options={CONFIG_TYPE_OPTIONS}
          />
          <Input
            id="api_key"
            label="API Key"
            icon={Settings}
            required
            value={formData.api_key}
            onChange={(e) => setFormData(prev => ({ ...prev, api_key: e.target.value }))}
            placeholder="请输入API Key"
          />
          <Input
            id="model_name"
            label="模型名称"
            icon={Settings}
            required
            value={formData.model_name}
            onChange={(e) => setFormData(prev => ({ ...prev, model_name: e.target.value }))}
            placeholder="请输入模型名称"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/settings/ai')}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
            >
              确认
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}