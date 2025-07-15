
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './slices/user';
import { authApi } from './slices/auth';
import { adminApi } from './slices/admin';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(adminApi.middleware),
});
