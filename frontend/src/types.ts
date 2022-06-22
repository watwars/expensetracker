export interface ErrorResponse {
  message?: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  user_password?: string;
}

export interface SignInRequest {
  request_id: string;
  username: string;
  password: string;
}

export interface CreateUserRequest extends User {
  password: string;
  request_id: string;
}
