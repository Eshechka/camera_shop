import { store } from '../store/index.js';

import { Product } from './product.js';
import { Promo } from './promo.js';

export type dataCatalog = {
  products: Product[],
  isDataLoading: boolean,
  promo: Promo | null,
};
export type dataProduct = {
  product: Product | null,
  isDataLoading: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
