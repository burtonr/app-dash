import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const appSlice = createSlice({
    name: 'app',
    initialState: {
        authDisabled: false,
        manageMode: false
    },
    reducers: {
        toggleManageMode: (state) => {
            state.manageMode = !state.manageMode
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
        })
    }
})

export const { toggleManageMode } = appSlice.actions

export default appSlice.reducer
