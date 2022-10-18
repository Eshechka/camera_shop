import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataCatalog } from '../../types/state';
import { fetchProductsAction, fetchPromoAction } from '../api-actions';


const initialState: dataCatalog = {
  products: [],
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
      .addCase(fetchPromoAction.fulfilled, (state, { payload }) => {
        state.promo = payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.promo = null;
      });
  }
});

