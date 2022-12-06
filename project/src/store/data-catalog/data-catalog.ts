import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataCatalog } from '../../types/state';
import { fetchProductsAction, fetchSearchingProductsAction, fetchProductsMetaInfoAction, fetchPromoAction } from '../api-actions';


const initialState: dataCatalog = {
  products: [],
  searchingProducts: [],
  productsLength: null,
  wholeCatalogMinPrice: null,
  wholeCatalogMaxPrice: null,
  productsMinPrice: null,
  productsMaxPrice: null,
  isDataLoading: false,
  promo: null,
};

export const Catalog = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    clearProductsMinPrice: (state) => {
      state.productsMinPrice = null;
    },
  },
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
      .addCase(fetchProductsMetaInfoAction.fulfilled, (state, { payload }) => {
        state.productsLength = payload.length;
        console.log('payload: ', payload.length); // eslint-disable-line

        state.productsMinPrice = payload.length ? Math.min(...payload.map((el) => el.price)) : ('');
        console.log('Из стейта пришло state.productsMinPrice: ', state.productsMinPrice); // eslint-disable-line
        state.productsMaxPrice = payload.length ? Math.max(...payload.map((el) => el.price)) : '';
      })
      .addCase(fetchProductsMetaInfoAction.rejected, (state) => {
        state.productsLength = null;
        state.productsMinPrice = null;
        console.log('Из стейта пришло state.productsMinPrice: ', state.productsMinPrice); // eslint-disable-line
        state.productsMaxPrice = null;
      })
      .addCase(fetchPromoAction.fulfilled, (state, { payload }) => {
        state.promo = payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.promo = null;
      });
  }
});

export const { clearProductsMinPrice } = Catalog.actions;
