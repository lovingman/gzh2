import React, { useEffect } from 'react';
import { UserInfoCard } from '../components/dashboard/UserInfoCard';
import { AIConfigCard } from '../components/dashboard/AIConfigCard';
import { PointsCard } from '../components/dashboard/PointsCard';
import { useUserInfo } from '../hooks/useUserInfo';

export default function Dashboard() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">欢迎回来，{userInfo.phone}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserInfoCard userInfo={userInfo} />
        <PointsCard balance={userInfo.points_balance} />
        <AIConfigCard configs={userInfo.ai_configs} />
      </div>
    </div>
  );
}