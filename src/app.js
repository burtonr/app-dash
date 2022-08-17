import React, { useEffect } from 'react'
import { Navbar } from './app/navbar'
import { ItemGrid } from './features/items/itemGrid'
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from './features/api/apiSlice'
import { EditDialog } from './features/dialog/editDialog'
import { Notification } from './features/notifications/notification'

const App = () => {
    const prefetchSettings = usePrefetch('getSettings')

    useEffect(() => {
        prefetchSettings()
    }, [])

    return (
        <div>
            <Navbar />
            <SignInDialog />
            <CreateDialog />
            <EditDialog />
            <ItemGrid />
            <Notification />
        </div>
    )
}

export default App;