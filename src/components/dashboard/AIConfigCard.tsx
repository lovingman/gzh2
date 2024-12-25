import React from 'react';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { AIConfig } from '../../types/auth';
import { useAIConfig } from '../../hooks/useAIConfig';

interface AIConfigCardProps {
  configs: AIConfig[];
}

export function AIConfigCard({ configs }: AIConfigCardProps) {
  const navigate = useNavigate();
  const { deleteConfig } = useAIConfig();

  const handleDelete = async (configId: number) => {
    if (window.confirm('确定要删除该配置吗？')) {
      await deleteConfig(configId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">个人AI配置</h2>
        <Button onClick={() => navigate('/settings/ai/new')}>
          <Plus className="h-4 w-4 mr-2" />
          新增配置
        </Button>
      </div>
      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.config_id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{config.config_type}</p>
              <p className="text-sm text-gray-500">模型: {config.model_name}</p>
            </div>
            <button
              onClick={() => handleDelete(config.config_id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {configs.length === 0 && (
          <p className="text-center text-gray-500 py-4">暂无AI配置</p>
        )}
      </div>
    </div>
  );
}