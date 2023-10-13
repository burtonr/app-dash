import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const storageNames = {
    darkMode: 'darkMode'
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        authDisabled: false,
        manageMode: false,
        darkMode: false
    },
    reducers: {
        toggleManageMode: (state) => {
            state.manageMode = !state.manageMode
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        }
    },
    extraReducers(builder) {
        builder.addMatcher(appSlice.actions.toggleDarkMode.match, (state) => {
            localStorage.setItem(storageNames.darkMode, state.darkMode)
        })
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
            state.darkMode = localStorage.getItem(storageNames.darkMode)
        })
    }
})

export const { toggleManageMode, toggleDarkMode } = appSlice.actions

export default appSlice.reducer
