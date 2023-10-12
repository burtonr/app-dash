import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import { Cookies } from "react-cookie"

const cookies = new Cookies()

const cookieNames = {
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
            cookies.set(cookieNames.darkMode, state.darkMode, { page: '/', sameSite: 'lax' })
        })
        builder.addMatcher(apiSlice.endpoints.getSettings.matchFulfilled, (state, { payload }) => {
            state.authDisabled = payload.authDisabled
            state.darkMode = cookies.get(cookieNames.darkMode)
        })
    }
})

export const { toggleManageMode, toggleDarkMode } = appSlice.actions

export default appSlice.reducer
