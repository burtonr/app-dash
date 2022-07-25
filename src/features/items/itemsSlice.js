import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const itemsSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.items.push(action.item)
        },
        remove: (state, action) => {
            state.items.filter(x => x.id !== action.item.id)
        }
    },
    extraReducers(builder) {
        builder.addMatcher(apiSlice.endpoints.getItems.matchFulfilled, (state, { payload }) => {
            state.splice(0, 0, ...payload)
        })
    }
})

export const { add, remove } = itemsSlice.actions

export default itemsSlice.reducer
