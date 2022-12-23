import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataBasket } from '../../types/state';
import { fetchProductByIdAction } from '../api-actions';


const initialState: dataBasket = {
  products: [],
  clickedProduct: null,
};

export const Basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      const foundProductIndex = state.products.findIndex((productObj) => productObj.id === +action.payload);
      if (foundProductIndex !== -1) {
        state.products[foundProductIndex].amount++;
      } else {
        state.products.push({id: +action.payload, amount: 1});
      }
    },
    clearClickedProduct: (state) => {
      state.clickedProduct = null;
    },
  },
  extraReducers(builder) {
    builder
    //   .addCase(fetchProductsAction.pending, (state) => {
    //     state.isDataLoading = true;
    //   })
      .addCase(fetchProductByIdAction.fulfilled, (state, { payload }) => {
        state.clickedProduct = payload[0];
        // state.isDataLoading = false;
      })
      .addCase(fetchProductByIdAction.rejected, (state) => {
        state.clickedProduct = null;
        // state.isDataLoading = false;
      });
  }
});

export const { addProductToBasket, clearClickedProduct } = Basket.actions;
