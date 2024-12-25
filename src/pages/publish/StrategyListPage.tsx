import React from 'react';
import { StrategyList } from '../../components/publish/StrategyList';

export default function StrategyListPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">发布策略</h1>
      <StrategyList />
    </div>
  );
}