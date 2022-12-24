import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataBasket } from '../../types/state';
import { fetchProductByIdAction, fetchProductsByIdsAction } from '../api-actions';


type changePayloadType = {
  payload: {
    productId: number;
    newAmount: number;
  };
}

const initialState: dataBasket = {
  productIdsWAmount: [],
  clickedProduct: null,
  basketProducts: [],
};

export const Basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      const foundProductIndex = state.productIdsWAmount.findIndex((productObj) => productObj.id === +action.payload);
      if (foundProductIndex !== -1) {
        state.productIdsWAmount[foundProductIndex].amount++;
      } else {
        state.productIdsWAmount.push({id: +action.payload, amount: 1});
      }
    },
    changeProductAmountInBasket: (state, { payload }: changePayloadType) => {
      const foundProductIndex = state.productIdsWAmount.findIndex((productObj) => productObj.id === payload.productId);
      state.productIdsWAmount[foundProductIndex].amount = payload.newAmount;
    },
    removeProductFromBasket: (state, action) => {
      state.productIdsWAmount = state.productIdsWAmount.filter((product) => product.id !== +action.payload);
    },
    clearClickedProduct: (state) => {
      state.clickedProduct = null;
    },
    clearProductIdsWAmount: (state) => {
      state.basketProducts = [];
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
      })
      .addCase(fetchProductsByIdsAction.fulfilled, (state, { payload }) => {
        state.basketProducts = payload;
      })
      .addCase(fetchProductsByIdsAction.rejected, (state) => {
        state.basketProducts = [];
      });
  }
});

export const { addProductToBasket, clearClickedProduct, clearProductIdsWAmount, removeProductFromBasket, changeProductAmountInBasket } = Basket.actions;
