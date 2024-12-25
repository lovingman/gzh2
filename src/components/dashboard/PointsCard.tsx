import React from 'react';
import { CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface PointsCardProps {
  balance: number;
}

export function PointsCard({ balance }: PointsCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">积分余额</h2>
        <Button onClick={() => navigate('/finance/recharge')}>
          <TrendingUp className="h-4 w-4 mr-2" />
          充值
        </Button>
      </div>
      <div className="flex items-center justify-center py-4">
        <CreditCard className="h-8 w-8 text-indigo-500 mr-3" />
        <span className="text-3xl font-bold text-gray-900">{balance}</span>
      </div>
      <Button 
        variant="secondary" 
        onClick={() => navigate('/finance/points')}
        className="w-full mt-4"
      >
        查看记录
      </Button>
    </div>
  );
}