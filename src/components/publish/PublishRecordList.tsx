import React, { useState } from 'react';
import { Search, RotateCcw, ExternalLink } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { usePublishRecords } from '../../hooks/publish/usePublishRecords';

const PUBLISH_STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: '成功', label: '成功' },
  { value: '失败', label: '失败' },
  { value: '处理中', label: '处理中' }
];

export function PublishRecordList() {
  const [searchForm, setSearchForm] = useState({
    public_name: '',
    status: '',
    publish_time: ''
  });

  const {
    records,
    loading,
    error,
    pages,
    currentPage,
    setParams
  } = usePublishRecords();

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
      public_name: '',
      status: '',
      publish_time: ''
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
          <Input
            id="public_name"
            label="公众号名称"
            icon={Search}
            value={searchForm.public_name}
            onChange={(e) => setSearchForm(prev => ({ ...prev, public_name: e.target.value }))}
            placeholder="请输入公众号名称"
          />
          <Select
            id="status"
            label="发布状态"
            icon={Search}
            value={searchForm.status}
            onChange={(e) => setSearchForm(prev => ({ ...prev, status: e.target.value }))}
            options={PUBLISH_STATUS_OPTIONS}
          />
          <Input
            id="publish_time"
            type="date"
            label="发布时间"
            icon={Search}
            value={searchForm.publish_time}
            onChange={(e) => setSearchForm(prev => ({ ...prev, publish_time: e.target.value }))}
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
                发布ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                公众号名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                原文链接
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(records) && records.length > 0 ? (
              records.map((record) => (
                <tr key={record.publish_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.publish_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.public_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === '成功' ? 'bg-green-100 text-green-800' :
                      record.status === '失败' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.publish_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.original_link && (
                      <a
                        href={record.original_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        查看原文
                      </a>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  暂无发布记录
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