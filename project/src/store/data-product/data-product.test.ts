import {Product} from './data-product';
import {clearIsReviewAdded} from './data-product';


describe('Reducer: Product', () => {
  it('without additional parameters should return initial state', () => {
    expect(Product.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        product: null,
        isDataLoading: false,
        isReviewAdded: null,
        similarProducts: [],
        productReviews: [],
      });
  });

  it('should increment current step by a given value', () => {
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


});
