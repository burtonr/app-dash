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
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser()

        if (user) {
            this.setState({ currentUser: user })
        }
    }
    
    handleLoginClicked = () => {
        this.setState({ openLogin: true })
    }
    
    handleLogoutClicked = () => {
        authService.logout()
    }

    handleEditClicked = () => {
        this.setState({ openEdit: true })
    }

    handleEditClosed = () => {
        // TODO: reload items
        console.log('Closed the edit dialog')
        this.setState({ openEdit: false })
    }

    render() {
        return (
            <div>
                <Navbar loginClicked={this.handleLoginClicked} logoutClicked={this.handleLogoutClicked} editClicked={this.handleEditClicked} />
                <LoginDialog isOpen={this.state.openLogin} />
                <EditDialog isOpen={this.state.openEdit} handleClose={this.handleEditClosed} />
                <ItemGrid />
            </div>
        )
    }
}

export default App;