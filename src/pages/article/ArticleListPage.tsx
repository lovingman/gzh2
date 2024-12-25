import React from 'react';
import { ArticleList } from '../../components/article/ArticleList';

export default function ArticleListPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">文章素材库</h1>
      <ArticleList />
    </div>
  );
}