import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/items/itemsSlice'
import dialogReducer from '../features/dialog/dialogSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
    reducer: {
        items: itemReducer,
        dialogs: dialogReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})