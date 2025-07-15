// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from './../../../config';

export const adminApi = createApi({
  reducerPath: 'adminApi',  // name for the API slice
  tagTypes: ['Admin'],
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }), // your backend URL

  endpoints: (builder) => ({
    getUsersListing: builder.query({
      query: () => '/get-users-listing',
     providesTags: [{ type: 'Admin', id: 'LIST' }],  // Tag to identify the users data // Tag to identify this data in the cache

    }),
    // addUser: builder.mutation({
    //   query: (newUser) => ({
    //     url: '/add-user',
    //     method: 'POST',
    //     body: newUser,
    //   }),
    //   invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    // }),

    // editUser: builder.mutation({
    //   query: (updatedUser) => ({
    //     url: `/update-user/${updatedUser.id}`,
    //     method: 'PUT',
    //     body: updatedUser,
    //   }),
    //   invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    // }),

    //  deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/delete-user/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    // }),

  }),
})

export const { useGetUsersListingQuery, useAddUserMutation, useEditUserMutation ,useDeleteUserMutation } = adminApi
