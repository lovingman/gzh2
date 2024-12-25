export interface Article {
  article_id: number;
  title: string;
  content: string;
  read_count: number;
  publish_time: string;
  reference_count: number;
  keywords: string;
  source: string;
  trade_status: '未交易' | '已交易' | '交易中';
  publish_status: '未发布' | '已发布' | '发布失败';
  points: number;
  platform: string;
  category: string;
}

export interface ArticleListParams {
  page?: number;
  limit?: number;
  title?: string;
  read_count?: number;
  publish_time?: string;
  reference_count?: number;
  keywords?: string;
  source?: string;
  trade_status?: string;
  publish_status?: string;
  platform?: string;
  category?: string;
}

export interface ArticleListResponse {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  items: Article[];
}