import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { Product } from '../types/product';
import { Promo } from '../types/promo.js';

export const fetchProductsAction = createAsyncThunk<Product[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'catalog/fetchProducts',
  async (params, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}${params ? `?${params}` : ''}`);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'catalog/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchProductAction = createAsyncThunk<Product, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetch',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Product>(`${APIRoute.Products}/${id}`);
    return data;
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<Product[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilar',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}/${id}/similar`);
    return data;
  },
);
