import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataProduct } from '../../types/state';
import { fetchProductAction, fetchProductReviewsAction, fetchSimilarProductsAction, addProductReviewAction } from '../api-actions';


const initialState: dataProduct = {
  product: null,
  isDataLoading: false,
  isReviewAdded: null,
  similarProducts: [],
  productReviews: [],
};

export const Product = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    clearIsReviewAdded: (state) => {
      state.isReviewAdded = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.product = null;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, { payload }) => {
        state.similarProducts = payload;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.similarProducts = [];
      })
      .addCase(fetchProductReviewsAction.fulfilled, (state, { payload }) => {
        state.productReviews = payload;
      })
      .addCase(fetchProductReviewsAction.rejected, (state) => {
        state.productReviews = [];
      })
      .addCase(addProductReviewAction.fulfilled, (state, { payload }) => {
        state.productReviews = [...state.productReviews, payload];
        state.isReviewAdded = true;
      })
      .addCase(addProductReviewAction.rejected, (state) => {
        state.isReviewAdded = false;
      });
  }
});

export const { clearIsReviewAdded } = Product.actions;
