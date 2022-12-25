import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Basket } from './data-basket/data-basket';
import { Catalog } from './data-catalog/data-catalog';
import { Product } from './data-product/data-product';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: Catalog.reducer,
  [NameSpace.Product]: Product.reducer,
  [NameSpace.Basket]: Basket.reducer,
});
