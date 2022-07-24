import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => '/dash',
            providesTags: (result = [], error, arg) => [
                'Item',
                ...result.map(({ id }) => ({ type: 'Item', id }))
            ],
        }),
        addItem: builder.mutation({
            query: (newItem) => ({
                url: '/dash',
                method: 'POST',
                body: newItem
            }),
            invalidatesTags: ['Item']
        }),
        editItem: builder.mutation({
            query: (item) => ({
                url: '/dash',
                method: 'PUT',
                body: item
            }),
            invalidatesTags: ['Item']
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/dash/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg.id }]
        })
    })
})

export const {
    useGetItemsQuery,
    useAddItemMutation,
    useEditItemMutation,
    useDeleteItemMutation
} = apiSlice