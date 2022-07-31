import React, { Component } from "react";
import { Navbar } from "./app/navbar";
import { ItemGrid } from "./features/items/itemGrid";
import { CreateDialog } from './features/dialog/createDialog'
import { SignInDialog } from './features/dialog/signInDialog'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openAdd: false,
            manageMode: false,
            itemAdded: 0,
            showError: false,
            errorMessage: '',
        }
    }

    handleErrorClose = () => {
        this.setState({ showError: false, errorMessage: '' })
    }

    render() {
        const { manageMode, itemAdded, showError, errorMessage } = this.state
        return (
            <div>
                <Navbar />
                <SignInDialog />
                <CreateDialog />
                {/* TODO: Create snackbar feature with error handling middleware */}
                {/* ref: https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level */}
                {/* <Snackbar open={showError} autoHideDuration={5000} onClose={this.handleErrorClose}>
                    <Alert onClose={this.handleErrorClose} severity="warning">
                        {errorMessage}
                    </Alert>
                </Snackbar> */}
                <ItemGrid manageMode={manageMode} itemAdded={itemAdded} />
            </div>
        )
    }
}

export default App;