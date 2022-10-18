import axios, { AxiosError, AxiosInstance } from 'axios';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error) {
        // todo сделать оповещение об ошибке
        // eslint-disable-next-line
        console.warn(error);
      }

      throw error;
    }
  );

  return api;
};
