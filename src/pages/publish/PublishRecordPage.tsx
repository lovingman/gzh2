import React from 'react';
import { PublishRecordList } from '../../components/publish/PublishRecordList';

export default function PublishRecordPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">发布记录</h1>
      <PublishRecordList />
    </div>
  );
}