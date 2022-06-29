import React, { Component } from "react";
import Navbar from "./components/navbar";
import ItemGrid from "./components/itemGrid";
import authService from "./services/auth.service";
import LoginDialog from "./components/login.component";
import AddDialog from "./components/add.component";

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openLogin: false,
            openAdd: false,
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

    handleAddClicked = () => {
        this.setState(prevState => ({ ...prevState, openAdd: true }))
    }

    handleAddClosed = () => {
        // TODO: reload items
        this.setState(prevState => ({ ...prevState, openAdd: false }))
    }

    render() {
        const { openLogin, openAdd, manageMode } = this.state
        return (
            <div>
                <Navbar
                    loginClicked={this.handleLoginClicked}
                    logoutClicked={this.handleLogoutClicked}
                    addClicked={this.handleAddClicked}
                    manageClicked={this.handleManageClicked}
                />
                <LoginDialog isOpen={openLogin} />
                <AddDialog isOpen={openAdd} handleClose={this.handleAddClosed} />
                <ItemGrid manageMode={manageMode} />
            </div>
        )
    }
}

export default App;