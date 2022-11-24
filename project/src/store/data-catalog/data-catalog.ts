import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataCatalog } from '../../types/state';
import { fetchProductsAction, fetchSearchingProductsAction, fetchProductsLengthAction, fetchPromoAction } from '../api-actions';


const initialState: dataCatalog = {
  products: [],
  searchingProducts: [],
  productsLength: null,
  isDataLoading: false,
  promo: null,
};

export const Catalog = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.products = [];
        state.isDataLoading = false;
      })
      .addCase(fetchSearchingProductsAction.fulfilled, (state, { payload }) => {
        state.searchingProducts = payload;
      })
      .addCase(fetchSearchingProductsAction.rejected, (state) => {
        state.searchingProducts = [];
      })
      .addCase(fetchProductsLengthAction.fulfilled, (state, { payload }) => {
        state.productsLength = payload.length;
      })
      .addCase(fetchProductsLengthAction.rejected, (state) => {
        state.productsLength = null;
      })
      .addCase(fetchPromoAction.fulfilled, (state, { payload }) => {
        state.promo = payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.promo = null;
      });
  }
});

