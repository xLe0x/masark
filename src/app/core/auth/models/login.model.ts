export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
