import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const itemsSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push(action.item)
        },
        remove: (state, action) => {
            state.filter(x => x.id !== action.item.id)
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(apiSlice.endpoints.getItems.matchFulfilled, (state, { payload }) => {
                payload.forEach(resItem => {
                    const idx = state.findIndex(i => i._id === resItem._id)
                    idx != -1 ? state.splice(idx, 1, resItem) : state.push(resItem)
                });
            })
            .addMatcher(apiSlice.endpoints.updateItem.matchFulfilled, (state, { payload }) => {
                if (payload?.dbResponse?.acknowledged) {
                    const updatedIdx = state.findIndex(x => x._id === payload.updatedItem._id)
                    state[updatedIdx] = { ...payload.updatedItem }
                }
            })
            .addMatcher(apiSlice.endpoints.deleteItem.matchFulfilled, (state, { meta }) => {
                const delIdx = state.findIndex(x => x._id === meta.originalArgs)
                state.splice(delIdx, 1)
            })
    }
})

export const { add, remove } = itemsSlice.actions

export default itemsSlice.reducer
