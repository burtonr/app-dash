import { createSlice } from "@reduxjs/toolkit"

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        editOpen: false,
        editItem: {},
        createOpen: false,
        signInOpen: false
    },
    reducers: {
        openEdit: (state, action) => {
            state.editOpen = true
            state.editItem = action.item
        },
        closeEdit: (state) => {
            state.editOpen = false
            state.editItem = {}
        },
        openCreate: (state) => {
            state.createOpen = true
        },
        closeCreate: (state) => {
            state.createOpen = false
        },
        openSignIn: (state) => {
            state.signInOpen = true
        },
        closeSignIn: (state) => {
            state.signInOpen = false
        }
    }
})

export const { openEdit, closeEdit, openCreate, closeCreate, openSignIn, closeSignIn } = dialogsSlice.actions

export default dialogsSlice.reducer
