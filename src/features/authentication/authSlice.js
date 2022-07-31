import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        username: '',
        role: '',
        accessToken: ''
    },
    reducers: {
        signout: (state) => {
            state = initialState
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.signin.matchFulfilled, (state, { payload }) => {
            state = payload
        })
    }
})

export const { signout } = userSlice.actions

export default userSlice.reducer
