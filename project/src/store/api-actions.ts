import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { Product } from '../types/product';

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'catalog/fetch',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(APIRoute.Products);
    return data;
  },
);
