import { useMemo } from 'react';
import { 
  Home, 
  MessageSquare, 
  Image, 
  Send, 
  FileText, 
  CreditCard, 
  Settings,
  LucideIcon
} from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  subItems?: Array<{
    label: string;
    path: string;
  }>;
  adminOnly?: boolean;
}

export function useNavigation() {
  const menuItems = useMemo<MenuItem[]>(() => [
    {
      label: '首页',
      path: '/dashboard',
      icon: Home,
    },
    {
      label: '公众号管理',
      path: '/wechat',
      icon: MessageSquare,
      subItems: [
        { label: '公众号列表', path: '/wechat/list' },
        { label: '新增公众号', path: '/wechat/add' },
      ]
    },
    {
      label: '素材库',
      path: '/materials',
      icon: Image,
      subItems: [
        { label: '文章素材库', path: '/materials/articles' },
        { label: '图片素材库', path: '/materials/images' },
      ]
    },
    {
      label: '发布管理',
      path: '/publish',
      icon: Send,
      subItems: [
        { label: '发布策略', path: '/publish/strategy' },
        { label: '排版模板', path: '/publish/templates' },
        { label: '发布列表', path: '/publish/list' },
      ]
    },
    {
      label: '内容生产管理',
      path: '/content',
      icon: FileText,
      subItems: [
        { label: '文章内容生产', path: '/content/articles' },
        { label: '图片内容生产', path: '/content/images' },
        { label: '内容交易中心', path: '/content/marketplace' },
      ]
    },
    {
      label: '财务中心',
      path: '/finance',
      icon: CreditCard,
      subItems: [
        { label: '积分记录', path: '/finance/points' },
        { label: '积分充值', path: '/finance/recharge' },
      ]
    },
    {
      label: '设置',
      path: '/settings',
      icon: Settings,
      subItems: [
        { label: '个人AI配置', path: '/settings/ai' },
      ]
    },
  ], []);

  return { menuItems };
}