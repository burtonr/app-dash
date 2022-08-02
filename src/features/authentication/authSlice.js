import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        signOut: (state) => {
            state = initialState
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
            // DEV: Spread operator does not fill the state:  state = { ...payload } results in empty state
            state._id = payload._id
            state.username = payload.username
            state.role = payload.role
            state.accessToken = payload.accessToken
        })
    }
})

export const { signOut } = userSlice.actions

export default userSlice.reducer
