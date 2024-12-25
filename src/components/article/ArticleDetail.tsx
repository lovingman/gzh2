import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useArticleDetail } from '../../hooks/article/useArticleDetail';

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { article, loading, error } = useArticleDetail(id);

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!article) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)} variant="secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-gray-500">发布时间：</span>
            <span>{new Date(article.publish_time).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-500">阅读量：</span>
            <span>{article.read_count}</span>
          </div>
          <div>
            <span className="text-gray-500">参考次数：</span>
            <span>{article.reference_count}</span>
          </div>
          <div>
            <span className="text-gray-500">关键词：</span>
            <span>{article.keywords}</span>
          </div>
          <div>
            <span className="text-gray-500">内容来源：</span>
            <span>{article.source}</span>
          </div>
          <div>
            <span className="text-gray-500">交易状态：</span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              article.trade_status === '已交易' ? 'bg-green-100 text-green-800' :
              article.trade_status === '交易中' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.trade_status}
            </span>
          </div>
          <div>
            <span className="text-gray-500">发布状态：</span>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              article.publish_status === '已发布' ? 'bg-green-100 text-green-800' :
              article.publish_status === '发布失败' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.publish_status}
            </span>
          </div>
          <div>
            <span className="text-gray-500">积分：</span>
            <span>{article.points}</span>
          </div>
          <div>
            <span className="text-gray-500">媒体平台：</span>
            <span>{article.platform}</span>
          </div>
          <div>
            <span className="text-gray-500">内容领域：</span>
            <span>{article.category}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">文章内容</h2>
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>
      </div>
    </div>
  );
}