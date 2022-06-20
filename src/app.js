import React, { Component } from "react";
import Navbar from "./components/navbar";
import ItemGrid from "./components/itemGrid";
import authService from "./services/auth.service";
import LoginDialog from "./components/login.component";

class App extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
        this.handleLoginClicked = this.handleLoginClicked.bind(this)

        this.state = {
            openLogin: false,
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser()

        if (user) {
            this.setState({ currentUser: user })
        }
    }

    logOut() {
        authService.logout()
    }

    handleLoginClicked() {
        this.setState({ openLogin: true })
    }

    render() {
        return (
            <div>
                <Navbar loginClicked={this.handleLoginClicked} />
                <LoginDialog isOpen={this.state.openLogin} />
                <ItemGrid />
            </div>
        )
    }
}

export default App;