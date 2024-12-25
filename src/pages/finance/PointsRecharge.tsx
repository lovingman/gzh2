import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { financeApi } from '../../services/finance/api';

export default function PointsRecharge() {
  const navigate = useNavigate();
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!points || parseInt(points) <= 0) {
      setError('请输入有效的充值积分数量');
      return;
    }

    setLoading(true);
    try {
      const response = await financeApi.rechargePoints(parseInt(points));
      if (response.code === 200) {
        navigate('/dashboard', { state: { message: '充值成功' } });
      } else {
        setError(response.message || '充值失败');
      }
    } catch (err) {
      setError('充值失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">积分充值</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="points"
            type="number"
            label="充值积分"
            icon={CreditCard}
            required
            min="1"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="请输入充值积分数量"
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
              确认充值
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}