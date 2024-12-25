// 添加图库类型相关的类型定义
export interface ImageTypesResponse {
  code: number;
  message: string;
  data: string[];
}

export interface ImageTypeError {
  code: 500;
  message: string;
}