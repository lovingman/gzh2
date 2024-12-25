export interface PublicAccount {
  public_id: number;
  name: string;
  app_id: string;
  app_secret: string;
  status: string;
  created_at: string;
}

export interface PublicAccountFormData {
  name: string;
  app_id: string;
  app_secret: string;
}

export interface UpdatePublicAccountData extends Partial<PublicAccountFormData> {
  public_id: number;
  status?: string;
}

export interface PublicAccountListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PublicAccountListResponse {
  items: PublicAccount[];
  total: number;
  page: number;
  limit: number;
}