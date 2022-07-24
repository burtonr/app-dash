import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemsSlice';
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
    reducer: {
        items: itemReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})