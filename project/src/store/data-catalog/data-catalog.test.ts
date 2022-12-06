import {Catalog} from './data-catalog';
import {makeFakeProducts, makeFakePromo} from '../../utils/mocks';
import {fetchProductsAction, fetchProductsMetaInfoAction, fetchPromoAction} from '../api-actions';

describe('Reducer: Product', () => {
  const products = makeFakeProducts();
  const initialState = {
    products: [],
    searchingProducts: [],
    productsLength: null,
    wholeCatalogMinPrice: null,
    productsMinPrice: null,
    productsMaxPrice: null,
    isDataLoading: false,
    promo: null,
  };

  it('should update products and isDataLoading by load products', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsAction.fulfilled.type, payload: products}))
      .toEqual({
        products: products,
        productsLength: null,
        wholeCatalogMinPrice: null,
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
        productsLength: null,
        wholeCatalogMinPrice: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: true,
        promo: null,
      });
  });
  it('should update products to empty [] and isDataLoading to false if load products rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsAction.rejected.type}))
      .toEqual({
        products: [],
        productsLength: null,
        wholeCatalogMinPrice: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: null,
      });
  });

  it('should update products meta info by load products', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchProductsMetaInfoAction.fulfilled.type, payload: products}))
      .toEqual({
        products: [],
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
      .toEqual({
        products: [],
        productsLength: null,
        wholeCatalogMinPrice: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: null,
      });
  });

  it('should update promo by load promo product', () => {
    const state = initialState;
    const promo = makeFakePromo();

    expect(Catalog.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({
        products: [],
        productsLength: null,
        wholeCatalogMinPrice: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: promo,
      });
  });
  it('should update promo to null if load promo product rejected', () => {
    const state = initialState;

    expect(Catalog.reducer(state, {type: fetchPromoAction.rejected.type}))
      .toEqual({
        products: [],
        productsLength: null,
        wholeCatalogMinPrice: null,
        productsMinPrice: null,
        productsMaxPrice: null,
        isDataLoading: false,
        promo: null,
      });
  });
});
