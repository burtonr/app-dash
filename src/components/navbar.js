import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    Login,
    Logout,
    MenuOpen,
    Menu,
    PlaylistAdd
} from '@mui/icons-material'
import authService from "../services/auth.service";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            manageMode: false
        };
    }

    componentDidMount = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            this.setState({ currentUser: user })
        }
    }

    isEditor = () => {
        const { currentUser } = this.state
        return currentUser && (currentUser.role == 'admin' || currentUser.role == 'editor')
    }

    handleManageClick = () => {
        const { manageClicked } = this.props

        this.setState(prevState => ({ ...prevState, manageMode: !prevState.manageMode }))
        manageClicked()
    }

    logout = () => {
        console.log('Logging out...');
        const { logoutClicked } = this.props
        this.setState({ currentUser: undefined })
        logoutClicked()
    }

    render() {
        const { currentUser, manageMode } = this.state
        const { loginClicked, addClicked } = this.props
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                        </Typography>
                        {this.isEditor() &&
                            (manageMode ?
                                <Tooltip title="View">
                                    <Button color="inherit" onClick={this.handleManageClick}><Menu /></Button>
                                </Tooltip> :
                                <Tooltip title="Manage">
                                    <Button color="inherit" onClick={this.handleManageClick}><MenuOpen /></Button>
                                </Tooltip>)
                        }
                        {this.isEditor() &&
                            <Tooltip title="Add Item">
                                <Button color="inherit" onClick={addClicked}><PlaylistAdd /></Button>
                            </Tooltip>
                        }
                        {currentUser ?
                            <Tooltip title="Logout">
                                <Button color="inherit" onClick={this.logout}><Logout /></Button>
                            </Tooltip> :
                            <Tooltip title="Login">
                                <Button color="inherit" onClick={loginClicked}><Login /></Button>
                            </Tooltip>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        )
    };
}
