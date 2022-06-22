import axios from 'axios';

import { BASE_API_URL } from 'constants/apiConstants';
import { print } from 'utils/utils';

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

const get = async (endpoint: string) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (err) {
    print(err);
    return err.response.data;
  }
};

const post = async (endpoint: string, data: any) => {
  try {
    const response = await instance.post(endpoint, data);
    return response.data;
  } catch (err) {
    print(err);
    return err.response.data;
  }
};

const api = { get, post };

export default api;
