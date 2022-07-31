import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/dash' }),
    tagTypes: ['Item', 'User'],
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (creds) => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...creds }
            }),
        }),
        getItems: builder.query({
            query: () => '/',
            providesTags: (result = [], error, arg) => [
                'Item',
                ...result.map(({ id }) => ({ type: 'Item', id }))
            ],
        }),
        addItem: builder.mutation({
            query: (newItem) => ({
                url: '/',
                method: 'POST',
                body: newItem
            }),
            invalidatesTags: ['Item']
        }),
        editItem: builder.mutation({
            query: (item) => ({
                url: `/${item.id}`,
                method: 'PUT',
                body: item
            }),
            invalidatesTags: ['Item']
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg.id }]
        })
    })
})

export const {
    useSignInMutation,
    useGetItemsQuery,
    useAddItemMutation,
    useEditItemMutation,
    useDeleteItemMutation
} = apiSlice