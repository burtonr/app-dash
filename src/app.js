import React, { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { Navbar } from './app/navbar'
import { ItemGrid } from './features/items/itemGrid'
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from './features/api/apiSlice'
import { EditDialog } from './features/dialog/editDialog'
import { useSelector } from 'react-redux'

const App = () => {
    const prefetchSettings = usePrefetch('getSettings')
    const { hasError, errorMessage, hasSuccess, successMessage } = useSelector(state => state.notifications)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [snackSev, setSnackSev] = useState('info')

    useEffect(() => {
        prefetchSettings()
    }, [])

    // Extra work here to keep the notification after the dialog is closed
    useEffect(() => {
        const hasNotification = hasError || hasSuccess
        if (openSnack && !hasNotification) {
            setTimeout(() => {
                setOpenSnack(false)
                setSnackMessage('')
            }, 5000)
        } else {
            const msg = errorMessage ?? successMessage
            setOpenSnack(hasError || hasSuccess)
            setSnackMessage(msg)
            setSnackSev(snackSeverity())
        }
    }, [hasError])

    const snackSeverity = () => {
        if (hasError) return 'error'
        if (hasSuccess) return 'success'
    }

    return (
        <div>
            <Navbar />
            <SignInDialog />
            <CreateDialog />
            <EditDialog />
            <Snackbar open={openSnack}
                autoHideDuration={5000}
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