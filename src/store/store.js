// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './slices/user';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,  // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),  // Add RTK Query middleware
})
