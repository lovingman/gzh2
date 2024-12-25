import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User, Lock } from 'lucide-react';
import { adminApi } from '../../services/admin/api';

export function UserManagement() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    member_level: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await adminApi.addUser(formData);
      if (response.code === 200) {
        setSuccess('用户添加成功');
        setFormData({ phone: '', password: '', member_level: 'user' });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('添加用户失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">添加新用户</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="phone"
          type="tel"
          label="手机号"
          icon={User}
          required
          placeholder="请输入手机号"
          value={formData.phone}
          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        />

        <Input
          id="password"
          type="password"
          label="密码"
          icon={Lock}
          required
          placeholder="请输入密码"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">会员等级</label>
          <select
            value={formData.member_level}
            onChange={e => setFormData(prev => ({ ...prev, member_level: e.target.value }))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="user">普通用户</option>
            <option value="admin">管理员</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}

        <Button type="submit" loading={loading}>
          添加用户
        </Button>
      </form>
    </div>
  );
}