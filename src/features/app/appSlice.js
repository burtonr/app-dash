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
        darkMode: false,
        groupMode: true,
    },
    reducers: {
        toggleManageMode: (state) => {
            state.manageMode = !state.manageMode
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        },
        toggleGroupMode: (state) => {
            state.groupMode = !state.groupMode
        }
    },
    extraReducers(builder) {
        builder.addMatcher(appSlice.actions.toggleDarkMode.match, (state) => {
            localStorage.setItem(storageNames.darkMode, state.darkMode)
        })
        builder.addMatcher(appSlice.actions.toggleGroupMode.match), (state) => {
            localStorage.setItem(storageNames.groupMode, state.groupMode)
        }
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
            state.darkMode = localStorage.getItem(storageNames.darkMode)
            state.groupMode = localStorage.getItem(storageNames.groupMode)
        })
    }
})

export const { toggleManageMode, toggleDarkMode, toggleGroupMode } = appSlice.actions

export default appSlice.reducer
