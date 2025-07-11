// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from './../../../config';

export const userApi = createApi({
  reducerPath: 'userApi',  // name for the API slice
  
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }), // your backend URL
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/get-users',  // API endpoint: GET /users
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useAddUserMutation } = userApi
