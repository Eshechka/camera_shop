import {Basket, clearBasketProducts, clearClickedProduct, clearIsOrderMade, clearProductIdsWAmount} from './data-basket';
import {makeFakeProducts, makeFakeProductsBasket} from '../../utils/mocks';
import {fetchProductByIdAction, fetchProductsByIdsAction } from '../api-actions';

describe('Reducer: Basket', () => {
  const products = makeFakeProducts();
  const productsBasket = makeFakeProductsBasket();

  const initialState = {
    productIdsWAmount: [],
    clickedProduct: null,
    basketProducts: [],
    isOrderMade: null,
  };

  it('should clear basketProducts state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: products,
      isOrderMade: null,
    };
    expect(Basket.reducer(state, clearBasketProducts()))
      .toEqual(initialState);
  });

  it('should clear clickedProduct state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: products[0],
      basketProducts: [],
      isOrderMade: null,
    };
    expect(Basket.reducer(state, clearClickedProduct()))
      .toEqual(initialState);
  });

  it('should clear isOrderMade state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: true,
    };
    expect(Basket.reducer(state, clearIsOrderMade()))
      .toEqual(initialState);
  });

  it('should clear productIdsWAmount state prop', () => {
    const state = {
      productIdsWAmount: productsBasket,
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: null,
    };
    expect(Basket.reducer(state, clearProductIdsWAmount()))
      .toEqual(initialState);
  });


  it('should update clickedProduct by load product', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductByIdAction.fulfilled.type, payload: [products[0]]}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: products[0],
        basketProducts: [],
        isOrderMade: null,
      });
  });
  it('should update clickedProduct to null([]) if load product rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductByIdAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update products meta info by load products', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductsByIdsAction.fulfilled.type, payload: products}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: products,
        isOrderMade: null,
      });
  });
  it('should update products meta info to null if load products rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductsByIdsAction.rejected.type}))
      .toEqual(initialState);
  });

});
