export const BASE_API_URL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:5000/api'
    : 'https://easy-budget-api.herokuapp.com/api';

export const signupEndpoint = '/users/signup';
export const signinEndpoint = '/users/signin';
