// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './slices/user';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,  // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),  // Add RTK Query middleware
})
