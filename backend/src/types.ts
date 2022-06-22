export interface CreateUserRequest {
  request_id: string;
  user_id: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  request_id: string;
  username: string;
  password: string;
}

export interface ErrorResponse {
  message?: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  user_password: string;
}
