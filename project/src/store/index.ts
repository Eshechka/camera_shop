import { configureStore } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';

export const api: AxiosInstance = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
