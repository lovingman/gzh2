import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { authApi } from '../../services/auth/api';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.resetPassword(oldPassword, newPassword);
      if (response.code === 200) {
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('重置密码失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">重置密码</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="oldPassword"
            type="password"
            label="当前密码"
            icon={KeyRound}
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            id="newPassword"
            type="password"
            label="新密码"
            icon={KeyRound}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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