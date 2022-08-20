import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const initialState = {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: () => {
            return initialState
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
            state._id = payload._id
            state.username = payload.username
            state.role = payload.role
            state.accessToken = payload.accessToken
        })
    }
})

export const { signOut } = userSlice.actions

export default userSlice.reducer
