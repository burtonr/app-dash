import React, { useEffect, useMemo, useState } from 'react'
import { blue, grey, deepPurple, purple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Navbar } from './app/navbar'
import { ItemGrid } from './features/items/itemGrid'
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from './features/api/apiSlice'
import { EditDialog } from './features/dialog/editDialog'
import { Notification } from './features/notifications/notification'

const App = () => {
    const prefetchSettings = usePrefetch('getSettings')
    const [mode, setMode] = useState('dark')

    useEffect(() => {
        prefetchSettings()
    }, [])

    // TODO: Future -> Store theme in DB and get with getSettings call. Also, adjustable via admin
    const getTheme = mode => {
        return ({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        primary: {
                            main: blue[600]
                        },
                        secondary: {
                            main: deepPurple['A400']
                        }
                    }
                    : {
                        primary: {
                            main: grey[800]
                        },
                        secondary: {
                            main: deepPurple[800]
                        }
                    })
            }
        })
    }

    // TODO: Button to exec setMode()
    // TODO: Store mode in local storage per user
    const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
                <SignInDialog />
                <CreateDialog />
                <EditDialog />
                <ItemGrid />
                <Notification />
            </div>
        </ThemeProvider>
    )
}

export default App;