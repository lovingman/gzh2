import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { publicAccountApi } from '../../services/public-account/api';
import { PublicAccountFormData } from '../../types/public-account';
import { usePublicAccountDetail } from '../../hooks/public-account/usePublicAccountDetail';

interface PublicAccountFormProps {
  isEdit?: boolean;
  accountId?: string;
}

export function PublicAccountForm({ isEdit, accountId }: PublicAccountFormProps) {
  const navigate = useNavigate();
  const { account, loading: fetchLoading, error: fetchError } = usePublicAccountDetail(isEdit ? accountId : undefined);
  const [showAppSecret, setShowAppSecret] = useState(false);
  
  const [formData, setFormData] = useState<PublicAccountFormData>({
    name: '',
    app_id: '',
    app_secret: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        app_id: account.app_id,
        app_secret: account.app_secret
      });
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = isEdit && accountId
        ? await publicAccountApi.update({ ...formData, public_id: parseInt(accountId) })
        : await publicAccountApi.add(formData);

      if (response.code === 200) {
        navigate('/wechat/list');
      } else {
        setError(response.message || '保存失败');
      }
    } catch (err) {
      setError('保存失败，请稍后重试');
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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? '编辑公众号' : '新增公众号'}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="name"
            label="公众号名称"
            icon={MessageSquare}
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="请输入公众号名称"
          />
          <Input
            id="app_id"
            label="App ID"
            icon={MessageSquare}
            required
            value={formData.app_id}
            onChange={(e) => setFormData(prev => ({ ...prev, app_id: e.target.value }))}
            placeholder="请输入App ID"
          />
          <div className="relative">
            <Input
              id="app_secret"
              label="App Secret"
              icon={MessageSquare}
              required
              type={showAppSecret ? "text" : "password"}
              value={formData.app_secret}
              onChange={(e) => setFormData(prev => ({ ...prev, app_secret: e.target.value }))}
              placeholder="请输入App Secret"
            />
            <button
              type="button"
              onClick={() => setShowAppSecret(!showAppSecret)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showAppSecret ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/wechat/list')}
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