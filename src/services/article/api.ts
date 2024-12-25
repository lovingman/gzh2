import { apiClient } from '../api/client';
import { Article, ArticleListParams, ArticleListResponse } from '../../types/article';
import { ApiResponse } from '../../types/auth';

export const articleApi = {
  getList: async (params: ArticleListParams): Promise<ApiResponse<ArticleListResponse>> => {
    const response = await apiClient.get('/api/article/list', { params });
    return response.data;
  },

  getDetail: async (articleId: number): Promise<ApiResponse<Article>> => {
    const response = await apiClient.get('/api/article/detail', {
      params: { article_id: articleId }
    });
    return response.data;
  }
};