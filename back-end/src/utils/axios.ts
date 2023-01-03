import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const initAxios = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: process.env.MOMO_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(config);

  instance.interceptors.request.use(function (error) {
    return Promise.reject(error);
  });
  return instance;
};
