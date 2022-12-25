import {Basket,
  clearBasketProducts,
  clearClickedProduct,
  clearDiscountInfo,
  clearIsOrderMade,
  clearProductIdsWAmount,
  addProductToBasket,
  removeProductFromBasket,
  clearDiscountIsApproved} from './data-basket';
import {makeFakeProducts, makeFakeProductsBasket} from '../../utils/mocks';
import {fetchProductByIdAction, fetchProductsByIdsAction, makeOrderAction, fetchPromoDiscountAction } from '../api-actions';


describe('Reducer: Basket', () => {
  const products = makeFakeProducts();
  const productsBasket = makeFakeProductsBasket();

  const initialState = {
    productIdsWAmount: [],
    clickedProduct: null,
    basketProducts: [],
    isOrderMade: null,
    discount: null,
    isDiscountApproved: null,
  };

  it('should add basketProduct state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: null,
      discount: null,
      isDiscountApproved: null,
    };
    expect(Basket.reducer(state, addProductToBasket(productsBasket[0].id)))
      .toEqual({
        productIdsWAmount: [{id: +productsBasket[0].id, amount: 1}],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: null,
        discount: null,
        isDiscountApproved: null,
      });
  });

  it('should remove basketProduct state prop', () => {
    const state = {
      productIdsWAmount: [{id: +productsBasket[0].id, amount: 1}],
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: null,
      discount: null,
      isDiscountApproved: null,
    };
    expect(Basket.reducer(state, removeProductFromBasket(productsBasket[0].id)))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: null,
        discount: null,
        isDiscountApproved: null,
      });
  });

  it('should clear isDiscountApproved state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: null,
      discount: null,
      isDiscountApproved: false,
    };
    expect(Basket.reducer(state, clearDiscountIsApproved()))
      .toEqual(initialState);
  });

  it('should clear basketProducts state prop', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: products,
      isOrderMade: null,
      discount: null,
      isDiscountApproved: null,
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
      discount: null,
      isDiscountApproved: null,
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
      discount: null,
      isDiscountApproved: null,
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
      discount: null,
      isDiscountApproved: null,
    };
    expect(Basket.reducer(state, clearProductIdsWAmount()))
      .toEqual(initialState);
  });

  it('should clear isDiscountApproved & discount state props', () => {
    const state = {
      productIdsWAmount: [],
      clickedProduct: null,
      basketProducts: [],
      isOrderMade: null,
      discount: 20,
      isDiscountApproved: true,
    };
    expect(Basket.reducer(state, clearDiscountInfo()))
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
        discount: null,
        isDiscountApproved: null,
      });
  });
  it('should update clickedProduct to null([]) if load product rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductByIdAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update products Ids by load products', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductsByIdsAction.fulfilled.type, payload: products}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: products,
        isOrderMade: null,
        discount: null,
        isDiscountApproved: null,
      });
  });
  it('should update products meta info to null if load products rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchProductsByIdsAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update discount & isDiscountApproved by load coupon', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchPromoDiscountAction.fulfilled.type, payload: 20}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: null,
        discount: 20,
        isDiscountApproved: true,
      });
  });
  it('should update discount & isDiscountApproved to null if load coupon rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: fetchPromoDiscountAction.rejected.type}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: null,
        discount: null,
        isDiscountApproved: false,
      });
  });

  it('should update isOrderMade by load order info', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: makeOrderAction.fulfilled.type, payload: {camerasIds: [1, 2], coupon: 'some_coupone'}}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: true,
        discount: null,
        isDiscountApproved: null,
      });
  });
  it('should update isOrderMade to false if load order info rejected', () => {
    const state = initialState;

    expect(Basket.reducer(state, {type: makeOrderAction.rejected.type}))
      .toEqual({
        productIdsWAmount: [],
        clickedProduct: null,
        basketProducts: [],
        isOrderMade: false,
        discount: null,
        isDiscountApproved: null,
      });
  });

});
