import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../features/app/appSlice'
import itemReducer from '../features/items/itemsSlice'
import userReducer from '../features/user/userSlice'
import dialogReducer from '../features/dialog/dialogSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        items: itemReducer,
        user: userReducer,
        dialogs: dialogReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})