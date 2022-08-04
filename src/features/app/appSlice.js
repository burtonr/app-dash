import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const appSlice = createSlice({
    name: 'app',
    initialState: {
        authDisabled: false,
        manageMode: false
    },
    reducers: {
        setManageMode: (state) => {
            state.manageMode = true
        },
        setViewMode: (state) => {
            state.manageMode = false
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
        })
    }
})

export const { setManageMode, setViewMode } = appSlice.actions

export default appSlice.reducer
