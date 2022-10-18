import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataProduct } from '../../types/state';
import { fetchProductAction } from '../api-actions';


const initialState: dataProduct = {
  product: null,
  isDataLoading: false,
};

export const Product = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
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
      });
  }
});

