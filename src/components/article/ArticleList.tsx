import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Eye, Download } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { useArticles } from '../../hooks/article/useArticles';

const TRADE_STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: '未交易', label: '未交易' },
  { value: '交易中', label: '交易中' },
  { value: '已交易', label: '已交易' }
];

const PUBLISH_STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: '未发布', label: '未发布' },
  { value: '已发布', label: '已发布' },
  { value: '发布失败', label: '发布失败' }
];

export function ArticleList() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    title: '',
    trade_status: '',
    publish_status: '',
    publish_time: ''
  });

  const {
    articles,
    loading,
    error,
    pages,
    currentPage,
    setParams
  } = useArticles();

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
      title: '',
      trade_status: '',
      publish_status: '',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            id="title"
            label="文章标题"
            icon={Search}
            value={searchForm.title}
            onChange={(e) => setSearchForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="请输入文章标题"
          />
          <Select
            id="trade_status"
            label="交易状态"
            icon={Search}
            value={searchForm.trade_status}
            onChange={(e) => setSearchForm(prev => ({ ...prev, trade_status: e.target.value }))}
            options={TRADE_STATUS_OPTIONS}
          />
          <Select
            id="publish_status"
            label="发布状态"
            icon={Search}
            value={searchForm.publish_status}
            onChange={(e) => setSearchForm(prev => ({ ...prev, publish_status: e.target.value }))}
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
        <div className="flex justify-end p-4">
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            导出数据
          </Button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                文章标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                阅读量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                参考次数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                交易状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布状态
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.article_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {article.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.read_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(article.publish_time).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.reference_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    article.trade_status === '已交易' ? 'bg-green-100 text-green-800' :
                    article.trade_status === '交易中' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {article.trade_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    article.publish_status === '已发布' ? 'bg-green-100 text-green-800' :
                    article.publish_status === '发布失败' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {article.publish_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/materials/articles/${article.article_id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  暂无数据
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