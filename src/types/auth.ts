export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    member_level: '管理员' | '普通';
  };
}

export interface AuthState {
  token: string | null;
  memberLevel: '管理员' | '普通' | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface AuthStore extends AuthState {
  login: (response: LoginResponse) => void;
  logout: () => void;
  clearAuth: () => void;
}