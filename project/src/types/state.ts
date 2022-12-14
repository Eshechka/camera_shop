import { store } from '../store/index.js';
import { Basket } from './basket.js';

import { Product } from './product.js';
import { Promo } from './promo.js';
import { Review } from './review.js';

export type dataCatalog = {
  products: Product[];
  searchingProducts: Product[];
  productsLength: number | null;
  productsMinPrice: number | '' | null;
  productsMaxPrice: number | '' | null;
  isDataLoading: boolean;
  promo: Promo | null;
};
export type dataBasket = {
  productIdsWAmount: Basket[];
  clickedProduct: Product | null;
  basketProducts: Product[];
  isOrderMade: boolean | null;
  discount: number | null;
  isDiscountApproved: boolean | null;
};
export type dataProduct = {
  product: Product | null;
  isDataLoading: boolean;
  similarProducts: Product[];
  productReviews: Review[];
  isReviewAdded: boolean | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
