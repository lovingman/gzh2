import React from 'react';
import { PublicAccountList } from '../../components/public-account/PublicAccountList';

export default function PublicAccountListPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">公众号管理</h1>
      <PublicAccountList />
    </div>
  );
}