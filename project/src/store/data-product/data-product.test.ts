import { makeFakeProduct, makeFakeProductReview, makeFakeProductReviews, makeFakeProducts } from '../../utils/mocks';
import { fetchProductAction, fetchSimilarProductsAction, fetchProductReviewsAction, addProductReviewAction } from '../api-actions';
import {Product} from './data-product';
import {clearIsReviewAdded} from './data-product';

describe('Reducer: Product', () => {
  it('without additional parameters should return initial state', () => {
    expect(Product.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  it('should clear isReviewAdded state prop', () => {
    const state = {
      product: null,
      isDataLoading: false,
      isReviewAdded: true,
      similarProducts: [],
      productReviews: [],
    };
    expect(Product.reducer(state, clearIsReviewAdded()))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  const product = makeFakeProduct();
  const initialState = {
    product: null,
    isDataLoading: false,
    isReviewAdded: null,
    similarProducts: [],
    productReviews: [],
  };

  it('should update product and isDataLoading by load product', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchProductAction.fulfilled.type, payload: product}))
      .toEqual({
        product: product,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });
  it('should update isDataLoading to true if load product pending', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchProductAction.pending.type}))
      .toEqual({
        product: null,
        isDataLoading: true,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });
  it('should update product to null and isDataLoading to false if load products rejected', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchProductAction.rejected.type}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  const similarProducts = makeFakeProducts(10);

  it('should update similarProducts by load similar products', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchSimilarProductsAction.fulfilled.type, payload: similarProducts}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: similarProducts,
        productReviews: [],
      });
  });
  it('should update similarProducts to empty [] if load similar products rejected', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchSimilarProductsAction.rejected.type}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  const productReviews = makeFakeProductReviews();

  it('should update productReviews by load product reviews', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchProductReviewsAction.fulfilled.type, payload: productReviews}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: productReviews,
      });
  });
  it('should update productReviews to empty [] if load product reviews rejected', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: fetchProductReviewsAction.rejected.type}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  const review = makeFakeProductReview();

  it('should upd product and isDataLoading by load product', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: addProductReviewAction.fulfilled.type, payload: review}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: true,
        similarProducts: [],
        productReviews: [...state.productReviews, review],
      });
  });
  it('should set product to null and isDataLoading to false if load products rejected', () => {
    const state = initialState;

    expect(Product.reducer(state, {type: addProductReviewAction.rejected.type}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: false,
        similarProducts: [],
        productReviews: [],
      });
  });
});
