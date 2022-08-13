import { createSlice } from "@reduxjs/toolkit"

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        hasError: false,
        errorMessage: '',
        hasSuccess: false,
        successMessage: ''
    },
    reducers: {
        addError: (state, action) => {
            const { payload: err } = action
            state.hasError = true

            if (err.data) {
                if (err.data.message)
                    state.errorMessage = err.data.message
            }

            // RTK Network error
            if (err.status === 'FETCH_ERROR') {
                state.errorMessage = 'Server error occurred. Contact the administrator'
            }
        },
        removeError: (state) => {
            state.hasError = false
            state.errorMessage = ''
        },
        addSuccess: (state, action) => {
            state.hasSuccess = true
            state.successMessage = action.payload
        },
        removeSuccess: (state) => {
            state.hasSuccess = false
            state.successMessage = ''
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            (action) => action.type.startsWith('dialogs/close'),
            (state) => {
                state.hasError = false
                state.errorMessage = ''
            })
    }
})

export const { addError, removeError, addSuccess, removeSuccess } = notificationsSlice.actions

export default notificationsSlice.reducer
