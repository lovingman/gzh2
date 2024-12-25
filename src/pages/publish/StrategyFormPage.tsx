import React from 'react';
import { useParams } from 'react-router-dom';
import { StrategyForm } from '../../components/publish/StrategyForm';

export default function StrategyFormPage() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEdit ? '编辑发布策略' : '新增发布策略'}
      </h1>
      <StrategyForm />
    </div>
  );
}