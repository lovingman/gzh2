import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Phone } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/auth/useAuth';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(formData);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('登录失败，请检查用户名和密码');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="phone"
        type="tel"
        label="手机号"
        icon={Phone}
        required
        placeholder="请输入手机号"
        value={formData.phone}
        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
      />

      <Input
        id="password"
        type="password"
        label="密码"
        icon={KeyRound}
        required
        placeholder="请输入密码"
        value={formData.password}
        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
      />

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <Button type="submit" loading={loading}>登录</Button>
    </form>
  );
}