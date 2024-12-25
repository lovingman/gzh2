import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { usePointsRecords } from '../../hooks/finance/usePointsRecords';

const STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: '充值', label: '充值' },
  { value: '消费', label: '消费' },
  { value: '退款', label: '退款' }
];

export function PointsRecordList() {
  const [searchForm, setSearchForm] = useState({
    status: '',
    start_date: '',
    end_date: ''
  });

  const {
    records,
    loading,
    error,
    pages,
    currentPage,
    setParams
  } = usePointsRecords();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(prev => ({
      ...prev,
      page: 1,
      ...searchForm
    }));
  };

  const handleReset = () => {
    setSearchForm({
      status: '',
      start_date: '',
      end_date: ''
    });
    setParams({ page: 1, limit: 10 });
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
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            id="status"
            label="记录类型"
            icon={Search}
            value={searchForm.status}
            onChange={(e) => setSearchForm(prev => ({ ...prev, status: e.target.value }))}
            options={STATUS_OPTIONS}
          />
          <Input
            id="start_date"
            type="date"
            label="开始日期"
            icon={Search}
            value={searchForm.start_date}
            onChange={(e) => setSearchForm(prev => ({ ...prev, start_date: e.target.value }))}
          />
          <Input
            id="end_date"
            type="date"
            label="结束日期"
            icon={Search}
            value={searchForm.end_date}
            onChange={(e) => setSearchForm(prev => ({ ...prev, end_date: e.target.value }))}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            搜索
          </Button>
        </div>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                记录ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                积分数量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                记录类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.record_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.record_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.status === '充值' ? 'bg-green-100 text-green-800' :
                    record.status === '消费' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  暂无积分记录
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