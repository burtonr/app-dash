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
import { signOut } from "../features/authentication/authSlice";

export const Navbar = () => {
    const currentUser = useSelector(state => state.user)
    const manageMode = true

    const dispatch = useDispatch()

    const isEditor = currentUser && (currentUser.role == 'admin' || currentUser.role == 'editor')

    const manageClicked = () => {
        // const { manageClicked } = this.props

        // this.setState(prevState => ({ ...prevState, manageMode: !prevState.manageMode }))
        // manageClicked()
    }

    const addClicked = () => {
        dispatch(openCreate())
    }

    const signInClicked = () => {
        dispatch(openSignIn())
    }

    const signOutClicked = () => {
        dispatch(signOut())
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
                    {currentUser?.username ?
                        <Tooltip title="Sign Out">
                            <Button color="inherit" onClick={signOutClicked}><Logout /></Button>
                        </Tooltip> :
                        <Tooltip title="Sign In">
                            <Button color="inherit" onClick={signInClicked}><Login /></Button>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
