import React from 'react';
import { LayoutList } from '../../components/publish/LayoutList';

export default function LayoutListPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">排版模板</h1>
      <LayoutList />
    </div>
  );
}