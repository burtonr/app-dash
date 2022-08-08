import React, { useEffect } from "react";
import { Navbar } from "./app/navbar";
import { ItemGrid } from "./features/items/itemGrid";
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'
import { usePrefetch } from "./features/api/apiSlice";
import { EditDialog } from "./features/dialog/editDialog";

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
            {/* TODO: Create snackbar feature with error handling middleware */}
            {/* ref: https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level */}
            {/* <Snackbar open={showError} autoHideDuration={5000} onClose={this.handleErrorClose}>
                    <Alert onClose={this.handleErrorClose} severity="warning">
                        {errorMessage}
                    </Alert>
                </Snackbar> */}
            <ItemGrid />
        </div>
    )
}

export default App;