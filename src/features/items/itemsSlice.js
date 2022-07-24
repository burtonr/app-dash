import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: []
    },
    reducers: {
        add: (state, action) => {
            state.items.push(action.item)
        },
        remove: (state, action) => {
            state.items.filter(x => x.id !== action.item.id)
        }
    }
})

export const { add, remove } = itemsSlice.actions

export default itemsSlice.reducer
