// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from './../../../config';

export const authApi = createApi({
  reducerPath: 'authApi',  // name for the API slice
  
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }), // your backend URL
  endpoints: (builder) => ({
    login: builder.mutation({
    query:(data)=>({
        url:"/login",
        method:"POST",
        body:data
    })
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: '/signup',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
})

export const { useLoginMutation , useSignupMutation } = authApi
