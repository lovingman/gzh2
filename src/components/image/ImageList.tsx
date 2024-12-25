import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Pagination } from '../ui/Pagination';
import { useImages } from '../../hooks/image/useImages';

export function ImageList() {
  const {
    images,
    loading,
    error,
    pages,
    currentPage,
    setParams
  } = useImages();

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图片预览
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图片名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图片ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                存储路径
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图片类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(images) && images.map((image) => (
              <tr key={image.image_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {image.path ? (
                    <img
                      src={image.path}
                      alt={image.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {image.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.image_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.path}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {image.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(image.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(!Array.isArray(images) || images.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  暂无图片数据
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}