import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        groups: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.item)
        },
        removeItem: (state, action) => {
            state.items.filter(x => x.id !== action.item.id)
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(apiSlice.endpoints.getItems.matchFulfilled, (state, { payload }) => {
                payload.forEach(resItem => {

                    // TODO: Map groups

                    const idx = state.items.findIndex(i => i._id === resItem._id)
                    idx != -1 ? state.items.splice(idx, 1, resItem) : state.items.push(resItem)
                });
            })
            .addMatcher(apiSlice.endpoints.updateItem.matchFulfilled, (state, { payload }) => {
                if (payload?.dbResponse?.acknowledged) {

                    // TODO: Check for group change/update

                    const updatedIdx = state.items.findIndex(x => x._id === payload.updatedItem._id)
                    state.items[updatedIdx] = { ...payload.updatedItem }
                }
            })
            .addMatcher(apiSlice.endpoints.deleteItem.matchFulfilled, (state, { meta }) => {

                // TODO: If deleteItem was only one with group, remove the group

                const delIdx = state.items.findIndex(x => x._id === meta.originalArgs)
                state.items.splice(delIdx, 1)
            })
    }
})

export const { addItem, removeItem } = itemsSlice.actions

export default itemsSlice.reducer
