import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const storageNames = {
    darkMode: 'darkMode',
    groupMode: 'groupMode',
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        authDisabled: false,
        manageMode: false,
        darkMode: localStorage.getItem(storageNames.darkMode),
        groupMode: localStorage.getItem(storageNames.groupMode)
    },
    reducers: {
        toggleManageMode: (state) => {
            state.manageMode = !state.manageMode
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
            localStorage.setItem(storageNames.darkMode, state.darkMode)
        },
        toggleGroupMode: (state) => {
            state.groupMode = !state.groupMode
            localStorage.setItem(storageNames.groupMode, state.groupMode)
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
        })
    }
})

export const { toggleManageMode, toggleDarkMode, toggleGroupMode } = appSlice.actions

export default appSlice.reducer
