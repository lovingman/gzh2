export const STRATEGY_TYPE_OPTIONS = [
  { value: '存草稿', label: '存草稿' },
  { value: '发布文章', label: '发布文章' }
] as const;

export const PUBLISH_TYPE_OPTIONS = [
  { value: '现在', label: '现在' },
  { value: '定时', label: '定时' }
] as const;

export const CONTENT_TYPE_OPTIONS = [
  { value: '文案', label: '文案' },
  { value: '头像', label: '头像' },
  { value: '生肖', label: '生肖' }
] as const;

export type StrategyType = typeof STRATEGY_TYPE_OPTIONS[number]['value'];
export type PublishType = typeof PUBLISH_TYPE_OPTIONS[number]['value'];
export type ContentType = typeof CONTENT_TYPE_OPTIONS[number]['value'];