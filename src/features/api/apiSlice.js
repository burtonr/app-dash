import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/dash',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.accessToken
            if (token)
                headers.set('x-access-token', token)

            return headers
        }
    }),
    tagTypes: ['Item', 'User'],
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => '/settings'
        }),
        signIn: builder.mutation({
            query: (creds) => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...creds }
            }),
            providesTags: (result = {}, error, arg) => [
                'User',
                ...result.map(({ _id }) => ({ type: 'User', id: _id }))
            ]
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
            invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg.item.id }]
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
    useGetSettingsQuery,
    useSignInMutation,
    useGetItemsQuery,
    useAddItemMutation,
    useEditItemMutation,
    useDeleteItemMutation,
    usePrefetch
} = apiSlice