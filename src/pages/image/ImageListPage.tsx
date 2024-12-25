import React from 'react';
import { ImageList } from '../../components/image/ImageList';

export default function ImageListPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">图片素材库</h1>
      <ImageList />
    </div>
  );
}