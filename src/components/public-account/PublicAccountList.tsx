import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Pagination } from '../ui/Pagination';
import { usePublicAccounts } from '../../hooks/public-account/usePublicAccounts';

export function PublicAccountList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    accounts, 
    loading, 
    error, 
    totalPages,
    currentPage,
    setParams, 
    deleteAccount, 
    toggleStatus 
  } = usePublicAccounts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(prev => ({ ...prev, page: 1, search: searchTerm }));
  };

  const handleDelete = async (publicId: number) => {
    if (window.confirm('确定要删除该公众号吗？')) {
      const success = await deleteAccount(publicId);
      if (!success) {
        alert('删除失败');
      }
    }
  };

  const handleToggleStatus = async (publicId: number, currentStatus: string) => {
    const newStatus = currentStatus === '正常' ? '禁用' : '正常';
    const success = await toggleStatus(publicId, newStatus);
    if (!success) {
      alert('状态更新失败');
    }
  };

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
      <div className="flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="w-64">
            <Input
              id="search"
              type="search"
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="请输入公众号名称"
            />
          </div>
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            搜索
          </Button>
        </form>
        <Button onClick={() => navigate('/wechat/add')}>
          <Plus className="h-4 w-4 mr-2" />
          新增公众号
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                公众号名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.public_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {account.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.app_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(account.public_id, account.status)}
                    className="flex items-center"
                  >
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === '正常'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {account.status}
                    </span>
                    {account.status === '正常' ? (
                      <ToggleRight className="h-4 w-4 ml-1 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 ml-1 text-red-600" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(account.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/wechat/edit/${account.public_id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.public_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}