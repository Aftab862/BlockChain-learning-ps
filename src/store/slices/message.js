// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from './../../../config';

export const messageApi = createApi({
  reducerPath: 'messageApi',  // name for the API slice
  tagTypes: ['messages'],
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }), // your backend URL

  endpoints: (builder) => ({
    //   query: () => '/get-conversation',
    getConversation: builder.query({
      query: (userId) => ({
        url: `/get-conversation/${userId}`,
        method: 'GET',

      }),
     providesTags: [{ type: 'messages', id: 'LIST' }],  // Tag to identify the users data // Tag to identify this data in the cache

    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/add-user',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'messages', id: 'LIST' }],
    }),

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

export const { useGetConversationQuery, 
    // useAddUserMutation, 
    // useEditUserMutation ,useDeleteUserMutation 

} = messageApi
