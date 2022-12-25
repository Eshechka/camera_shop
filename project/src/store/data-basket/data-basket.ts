import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { dataBasket } from '../../types/state';
import { fetchProductByIdAction, fetchProductsByIdsAction, makeOrderAction } from '../api-actions';


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
  isOrderMade: null,
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
      state.productIdsWAmount = [];
    },
    clearBasketProducts: (state) => {
      state.basketProducts = [];
    },
    clearIsOrderMade: (state) => {
      state.isOrderMade = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(makeOrderAction.fulfilled, (state) => {
        state.isOrderMade = true;
      })
      .addCase(makeOrderAction.rejected, (state) => {
        state.isOrderMade = false;
      })
      .addCase(fetchProductByIdAction.fulfilled, (state, { payload }) => {
        state.clickedProduct = payload[0];
      })
      .addCase(fetchProductByIdAction.rejected, (state) => {
        state.clickedProduct = null;
      })
      .addCase(fetchProductsByIdsAction.fulfilled, (state, { payload }) => {
        state.basketProducts = payload;
      })
      .addCase(fetchProductsByIdsAction.rejected, (state) => {
        state.basketProducts = [];
      });
  }
});

export const { addProductToBasket, clearClickedProduct, clearProductIdsWAmount, clearBasketProducts, removeProductFromBasket, changeProductAmountInBasket, clearIsOrderMade } = Basket.actions;
