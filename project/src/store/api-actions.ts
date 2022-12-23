import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { Product } from '../types/product';
import { Promo } from '../types/promo.js';
import { Review } from '../types/review.js';
import { ReviewFormData } from '../types/reviewFormData.js';

export const fetchProductsMetaInfoAction = createAsyncThunk<Product[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'catalog/fetchProductsMetaInfo',
  async (params, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}${params ? `?${params}` : ''}`);
    return data;
  },
);

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

export const fetchSearchingProductsAction = createAsyncThunk<Product[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'catalog/fetchSearchingProducts',
  async (params, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}${params ? `?${params}` : ''}`);
    return data;
  },
);

export const fetchProductByIdAction = createAsyncThunk<Product[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'basket/fetchProductById',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}${`?id=${id}`}`);
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

export const fetchProductAction = createAsyncThunk<Product, string, {
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

export const fetchSimilarProductsAction = createAsyncThunk<Product[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilar',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Products}/${id}${APIRoute.Similar}`);
    return data;
  },
);

export const fetchProductReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchReviews',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Products}/${id}${APIRoute.Reviews}`);
    return data;
  },
);

export const addProductReviewAction = createAsyncThunk<Review, ReviewFormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/addReview',
  async (formData, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Reviews, formData);
    return data;
  },
);
