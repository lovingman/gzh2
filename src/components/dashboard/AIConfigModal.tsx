import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { adminApi } from '../../services/admin/api';

interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AIConfigModal({ isOpen, onClose, onSuccess }: AIConfigModalProps) {
  const [formData, setFormData] = useState({
    config_type: '',
    api_key: '',
    model_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminApi.addAIConfig(formData);
      if (response.code === 200) {
        onSuccess();
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('添加配置失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">新增AI配置</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="config_type"
            label="配置类型"
            icon={Settings}
            required
            value={formData.config_type}
            onChange={(e) => setFormData(prev => ({ ...prev, config_type: e.target.value }))}
          />
          <Input
            id="api_key"
            label="API Key"
            icon={Settings}
            required
            value={formData.api_key}
            onChange={(e) => setFormData(prev => ({ ...prev, api_key: e.target.value }))}
          />
          <Input
            id="model_name"
            label="模型名称"
            icon={Settings}
            required
            value={formData.model_name}
            onChange={(e) => setFormData(prev => ({ ...prev, model_name: e.target.value }))}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" loading={loading}>
              确认
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}