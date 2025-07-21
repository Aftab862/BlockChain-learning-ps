
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './slices/user';
import { authApi } from './slices/auth';
import { adminApi } from './slices/admin';
import { messageApi } from './slices/message';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(messageApi.middleware)

});
