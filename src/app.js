import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { blue, grey, deepPurple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { Navbar } from './app/navbar'
import { ItemGrid } from './features/items/itemGrid'
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from './features/api/apiSlice'
import { EditDialog } from './features/dialog/editDialog'
import { Notification } from './features/notifications/notification'

const App = () => {
    const prefetchSettings = usePrefetch('getSettings')
    const isDarkMode = useSelector(state => state.app.darkMode)

    useEffect(() => {
        prefetchSettings()
    }, [])

    // TODO: Future -> Store theme in DB and get with getSettings call. Also, adjustable via admin
    const getTheme = () => {
        const mode = isDarkMode ? 'dark' : 'light'
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
                        // DEV: 'Borrowed' from Github dark mode
                        background: {
                            default: '#161b22',
                            paper: '#161b22'
                        },
                        primary: {
                            main: grey[800]
                        },
                        secondary: {
                            main: deepPurple[300]
                        }
                    })
            }
        })
    }

    // TODO: Store mode in local storage per user
    const theme = useMemo(() => createTheme(getTheme()), [isDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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