import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authApi } from '../services/auth/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('新密码与确认密码不一致');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.resetPassword(formData.oldPassword, formData.newPassword);
      if (response.code === 200) {
        navigate('/dashboard', { state: { message: '密码重置成功' } });
      } else {
        setError(response.message || '密码重置失败');
      }
    } catch (err) {
      setError('密码重置失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">重置密码</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="oldPassword"
            type="password"
            label="当前密码"
            icon={KeyRound}
            required
            value={formData.oldPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, oldPassword: e.target.value }))}
          />

          <Input
            id="newPassword"
            type="password"
            label="新密码"
            icon={KeyRound}
            required
            value={formData.newPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
          />

          <Input
            id="confirmPassword"
            type="password"
            label="确认新密码"
            icon={KeyRound}
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
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