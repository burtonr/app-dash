import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { openCreate, openSignIn } from '../features/dialog/dialogSlice'

export const Navbar = () => {

    // TODO: useSelector(userRole)
    const isEditor = true
    const currentUser = false
    const manageMode = true

    const dispatch = useDispatch()

    // componentDidMount = async () => {
    //     const user = await authService.getCurrentUser();
    //     if (user) {
    //         this.setState({ currentUser: user })
    //     }
    // }

    // isEditor = () => {
    //     const { currentUser } = this.state
    //     return currentUser && (currentUser.role == 'admin' || currentUser.role == 'editor')
    // }

    const manageClicked = () => {
        // const { manageClicked } = this.props

        // this.setState(prevState => ({ ...prevState, manageMode: !prevState.manageMode }))
        // manageClicked()
    }

    const addClicked = () => {
        dispatch(openCreate())
    }

    const loginClicked = () => {
        dispatch(openSignIn())
    }

    const logout = () => {
        console.log('Logging out...');
        // const { logoutClicked } = this.props
        // this.setState({ currentUser: undefined })
        // logoutClicked()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                    </Typography>
                    {isEditor &&
                        (manageMode ?
                            <Tooltip title="View">
                                <Button color="inherit" onClick={manageClicked}><Menu /></Button>
                            </Tooltip> :
                            <Tooltip title="Manage">
                                <Button color="inherit" onClick={manageClicked}><MenuOpen /></Button>
                            </Tooltip>)
                    }
                    {isEditor &&
                        <Tooltip title="Add Item">
                            <Button color="inherit" onClick={addClicked}><PlaylistAdd /></Button>
                        </Tooltip>
                    }
                    {currentUser ?
                        <Tooltip title="Logout">
                            <Button color="inherit" onClick={logout}><Logout /></Button>
                        </Tooltip> :
                        <Tooltip title="Login">
                            <Button color="inherit" onClick={loginClicked}><Login /></Button>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
