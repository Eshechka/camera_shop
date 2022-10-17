import { store } from '../store/index.js';

import { Product } from './product.js';

export type dataCatalog = {
  products: Product[],
  isDataLoading: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
