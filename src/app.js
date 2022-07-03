import React, { Component } from "react";
import Navbar from "./components/navbar";
import ItemGrid from "./components/itemGrid";
import authService from "./services/auth.service";
import LoginDialog from "./components/login.component";
import AddDialog from "./components/add.component";
import { Alert, Snackbar } from "@mui/material";

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openLogin: false,
            openAdd: false,
            currentUser: undefined,
            manageMode: false,
            itemAdded: 0,
            showError: false,
            errorMessage: '',
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser()

        if (user) {
            this.setState(prevState => ({ ...prevState, currentUser: user }))
        }
    }

    handleLoginClicked = () => {
        this.setState(prevState => ({ ...prevState, openLogin: true }))
    }

    handleLogoutClicked = () => {
        authService.logout()
    }

    handleManageClicked = () => {
        this.setState(prevState => ({ ...prevState, manageMode: !prevState.manageMode }))
    }

    handleAddClicked = () => {
        this.setState(prevState => ({ ...prevState, openAdd: true }))
    }

    handleAddClosed = (shouldUpdate) => {
        if (shouldUpdate) {
            this.setState({ openAdd: false, itemAdded: this.state.itemAdded + 1 })
        } else {
            this.setState({ openAdd: false })
        }
    }

    handleError = (errResponse) => {
        if (errResponse) {
            // TODO: Additional status'. Move to separate external file for use elsewhere
            if (errResponse.status == 401) {
                this.setState({ showError: true, errorMessage: 'Not authorized. Log in, or contact the administrator' })
            } else {
                const message = errResponse.message ? errResponse.message : 'An unknown problem occurred. Contact the administrator'
                this.setState({ showError: true, errorMessage: message })
            }
        } else {
            this.setState({ showError: true, errorMessage: 'A system error occurred. Contact the administrator' })
        }

    }

    handleErrorClose = () => {
        this.setState({ showError: false, errorMessage: '' })
    }

    render() {
        const { openLogin, openAdd, manageMode, itemAdded, showError, errorMessage } = this.state
        return (
            <div>
                <Navbar
                    loginClicked={this.handleLoginClicked}
                    logoutClicked={this.handleLogoutClicked}
                    addClicked={this.handleAddClicked}
                    manageClicked={this.handleManageClicked}
                />
                <LoginDialog isOpen={openLogin} />
                <AddDialog isOpen={openAdd} handleClose={this.handleAddClosed} handleError={this.handleError} />
                <Snackbar open={showError} autoHideDuration={5000} onClose={this.handleErrorClose}>
                    <Alert onClose={this.handleErrorClose} severity="warning">
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <ItemGrid manageMode={manageMode} itemAdded={itemAdded} handleError={this.handleError} />
            </div>
        )
    }
}

export default App;