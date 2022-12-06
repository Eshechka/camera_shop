import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

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
      console.warn('---AxiosError---', error); // eslint-disable-line

      if (error.message) {
        console.warn('---AxiosError error.message---', error.message); // eslint-disable-line
        toast.warn(error.message);
      }

      throw error;
    }
  );

  return api;
};
