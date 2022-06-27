import React, { Component } from "react";
import Navbar from "./components/navbar";
import ItemGrid from "./components/itemGrid";
import authService from "./services/auth.service";
import LoginDialog from "./components/login.component";
import EditDialog from "./components/edit.component";

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openLogin: false,
            openEdit: false,
            currentUser: undefined,
            manageMode: false,
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

    handleEditClicked = () => {
        this.setState(prevState => ({ ...prevState, openEdit: true }))
    }

    handleEditClosed = () => {
        // TODO: reload items
        console.log('Closed the edit dialog')
        this.setState(prevState => ({ ...prevState, openEdit: false }))
    }

    render() {
        const { openLogin, openEdit, manageMode } = this.state
        return (
            <div>
                <Navbar
                    loginClicked={this.handleLoginClicked}
                    logoutClicked={this.handleLogoutClicked}
                    editClicked={this.handleEditClicked}
                    manageClicked={this.handleManageClicked}
                />
                <LoginDialog isOpen={openLogin} />
                <EditDialog isOpen={openEdit} handleClose={this.handleEditClosed} />
                <ItemGrid manageMode={manageMode} />
            </div>
        )
    }
}

export default App;