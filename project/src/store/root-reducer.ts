import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Catalog } from './data-catalog/data-catalog';
import { Product } from './data-product/data-product';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: Catalog.reducer,
  [NameSpace.Product]: Product.reducer,
});
