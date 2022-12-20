import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataBasket } from '../../types/state';


const initialState: dataBasket = {
  products: [],
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
  },
// extraReducers(builder) {
  // builder
  //   .addCase(fetchProductsAction.pending, (state) => {
  //     state.isDataLoading = true;
  //   })
  //   .addCase(fetchProductsAction.fulfilled, (state, { payload }) => {
  //     state.products = payload;
  //     state.isDataLoading = false;
  //   })
  //   .addCase(fetchProductsAction.rejected, (state) => {
  //     state.products = [];
  //     state.isDataLoading = false;
  //   })
  //   ;
// }
});

export const { addProductToBasket } = Basket.actions;
