import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'

import { clearNotifications } from './notificationsSlice'

export const Notification = () => {
    const dispatch = useDispatch()
    const { hasError, errorMessage, hasSuccess, successMessage } = useSelector(state => state.notifications)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSev, setSnackSev] = useState('info')

    useEffect(() => {
        const hasNotification = hasError || hasSuccess
        const msg = errorMessage ? errorMessage : successMessage
        const sev = snackSeverity()
        setOpenSnack(hasNotification)
        setSnackMessage(msg)
        setSnackSev(sev)
    }, [hasError, hasSuccess])

    const snackSeverity = () => {
        if (hasError) return 'error'
        if (hasSuccess) return 'success'
        return 'info'
    }

    const closeAndClear = (e, reason) => {
        if (reason === 'timeout')
            dispatch(clearNotifications())
    }

    return (
        <Snackbar open={openSnack}
            autoHideDuration={5000}
            onClose={closeAndClear}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity={snackSev}>
                {snackMessage}
            </Alert>
        </Snackbar>)
}