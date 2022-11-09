import { store } from '../store/index.js';

import { Product } from './product.js';
import { Promo } from './promo.js';
import { Review } from './review.js';

export type dataCatalog = {
  products: Product[];
  productsLength: number | null;
  isDataLoading: boolean;
  promo: Promo | null;
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
