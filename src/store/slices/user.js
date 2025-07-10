// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',  // name for the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // your backend URL
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',  // API endpoint: GET /users
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
