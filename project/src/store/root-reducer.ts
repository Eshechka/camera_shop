import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { Catalog } from './data-catalog/data-catalog';

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: Catalog.reducer,
});
