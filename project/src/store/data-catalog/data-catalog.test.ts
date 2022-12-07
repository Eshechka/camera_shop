import {Catalog, clearProductsMaxPrice, clearProductsMinPrice} from './data-catalog';
import {makeFakeProducts, makeFakePromo} from '../../utils/mocks';
import {fetchProductsAction, fetchProductsMetaInfoAction, fetchPromoAction, fetchSearchingProductsAction} from '../api-actions';

describe('Reducer: Product', () => {
  const products = makeFakeProducts();
  const initialState = {
    products: [],
    searchingProducts: [],
    productsLength: null,
    productsMinPrice: null,
    productsMaxPrice: null,
    isDataLoading: false,
    promo: null,
  };

  it('should clear ProductsMinPrice state prop', () => {
    const state = {
      products: [],
      searchingProducts: [],
      productsLength: null,
      productsMinPrice: 1000,
      productsMaxPrice: null,
      isDataLoading: false,
      promo: null,
    };
    expect(Catalog.reducer(state, clearProductsMinPrice()))
      .toEqual(initialState);
  });

  it('should clear ProductsMaxPrice state prop', () => {
    const state = {
      products: [],
      searchingProducts: [],
      productsLength: null,
      productsMaxPrice: 10000,
      productsMinPrice: null,
      isDataLoading: false,
      promo: null,
    };
    expect(Catalog.reducer(state, clearProductsMaxPrice()))
      .toEqual(initialState);
  });

  it('should update products and isDataLoading by load products', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsAction.fulfilled.type, payload: products}))
      .toEqual({
        products: products,
        searchingProducts: [],
        productsLength: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: null,
      });
  });
  it('should update isDataLoading to true if load products pending', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsAction.pending.type}))
      .toEqual({
        products: [],
        searchingProducts: [],
        productsLength: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: true,
        promo: null,
      });
  });
  it('should update products to empty [] and isDataLoading to false if load products rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update products meta info by load products', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsMetaInfoAction.fulfilled.type, payload: products}))
      .toEqual({
        products: [],
        searchingProducts: [],
        productsLength: products.length,
        productsMinPrice: Math.min(...products.map((el) => el.price)),
        productsMaxPrice: Math.max(...products.map((el) => el.price)),
        isDataLoading: false,
        promo: null,
      });
  });
  it('should update products meta info to null if load products rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsMetaInfoAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update Searching Products by load products', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchSearchingProductsAction.fulfilled.type, payload: products}))
      .toEqual({
        products: [],
        searchingProducts: products,
        productsLength: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: null,
      });
  });
  it('should update Searching Products to empty [] if load products rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchSearchingProductsAction.rejected.type}))
      .toEqual(initialState);
  });

  it('should update promo by load promo product', () => {
    const state = initialState;
    const promo = makeFakePromo();

    expect(Catalog.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({
        products: [],
        searchingProducts: [],
        productsLength: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: promo,
      });
  });
  it('should update promo to null if load promo product rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchPromoAction.rejected.type}))
      .toEqual(initialState);
  });
});
