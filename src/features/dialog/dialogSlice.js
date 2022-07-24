import { createSlice } from "@reduxjs/toolkit"

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        editOpen: false,
        editItem: {},
        createOpen: false,
        loginOpen: false
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
        openLogin: (state) => {
            state.loginOpen = true
        }
    }
})

export const { openEdit, closeEdit, openCreate, closeCreate, openLogin } = dialogsSlice.actions

export default dialogsSlice.reducer
