import { v4 as uuidv4 } from 'uuid';

import { signinEndpoint, signupEndpoint } from 'constants/apiConstants';
import { CreateUserRequest, SignInRequest, User } from 'types';
import api from './api';
import { toast } from 'react-toastify';

const parseSignUpFailedError = (detail: string): string => {
  if (detail.includes('already exists')) {
    return 'Username or email already exists';
  }
  return 'Error creating account, please try again';
};

export const signUp = async (userData: User) => {
  const requestId = uuidv4();
  const request: CreateUserRequest = {
    request_id: requestId,
    ...userData,
    password: userData.user_password,
  };
  const response = await api.post(signupEndpoint, request);
  if (response.isSuccess) {
    toast.success(
      'Account created successfully. You will be redirected shortly to the your dashboard.'
    );
    return response;
  } else {
    const errorMessage = parseSignUpFailedError(response.message.detail);
    toast.error(errorMessage);
    return null;
  }
};

export const signIn = async (username: string, password: string) => {
  const request: SignInRequest = {
    username,
    password,
    request_id: uuidv4(),
  };
  const response = await api.post(signinEndpoint, request);
  if (response.isSuccess) {
    const username = response.user.username;
    toast.success(`Welcome back, ${username}!`);
    return response;
  } else {
    if (response.message.includes('ExpenseTracker')) {
      toast.error(response.message.split('error: ')[1]);
    } else {
      toast.error('Error signing in, please try again later');
    }
    return null;
  }
};
