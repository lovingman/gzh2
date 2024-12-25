export const CONFIG_TYPES = {
  ZHIPU: '智普',
  DOUBAO: '豆包',
  SEEK: 'seek',
  OTHER: '其他'
} as const;

export type ConfigType = typeof CONFIG_TYPES[keyof typeof CONFIG_TYPES];

export const CONFIG_TYPE_OPTIONS = [
  { value: '智普', label: '智普' },
  { value: '豆包', label: '豆包' },
  { value: 'seek', label: 'seek' },
  { value: '其他', label: '其他' }
];