import React from 'react';
import { PointsRecordList } from '../../components/finance/PointsRecordList';

export default function PointsRecordPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">积分记录</h1>
      <PointsRecordList />
    </div>
  );
}