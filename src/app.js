import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'
import { Navbar } from './app/navbar'
import { ItemGrid } from './features/items/itemGrid'
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from './features/api/apiSlice'
import { EditDialog } from './features/dialog/editDialog'
import { clearNotifications } from './features/notifications/notificationsSlice'

const App = () => {
    const dispatch = useDispatch()
    const prefetchSettings = usePrefetch('getSettings')
    const { hasError, errorMessage, hasSuccess, successMessage } = useSelector(state => state.notifications)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSev, setSnackSev] = useState('info')

    useEffect(() => {
        prefetchSettings()
    }, [])

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
    }

    const closeAndClear = () => {
        dispatch(clearNotifications())
    }

    return (
        <div>
            <Navbar />
            <SignInDialog />
            <CreateDialog />
            <EditDialog />
            <Snackbar open={openSnack}
                autoHideDuration={5000}
                onClose={closeAndClear}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackSev}>
                    {snackMessage}
                </Alert>
            </Snackbar>
            <ItemGrid />
        </div>
    )
}

export default App;