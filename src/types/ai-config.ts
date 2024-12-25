export interface AIConfig {
  config_id: number;
  config_type: string;
  api_key: string;
  model_name: string;
  user_id?: number;
}

export interface AIConfigFormData {
  config_type: string;
  api_key: string;
  model_name: string;
}

export interface UpdateAIConfigData extends AIConfigFormData {
  config_id: number;
}