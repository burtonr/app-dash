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
    PlaylistAdd,
    DarkMode,
    LightMode
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleManageMode } from "../features/app/appSlice";
import { openCreate, openSignIn } from '../features/dialog/dialogSlice'
import { signOut } from "../features/user/userSlice";

export const Navbar = () => {
    const appSettings = useSelector(state => state.app)
    const currentUser = useSelector(state => state.user)

    const dispatch = useDispatch()

    const isEditor = () => {
        if (appSettings.authDisabled)
            return true

        return currentUser && (currentUser.role == 'admin' || currentUser.role == 'editor')
    }

    const isDarkMode = () => {
        return appSettings.darkMode
    }

    const manageClicked = () => {
        dispatch(toggleManageMode())
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

    const modeSelectClicked = () => {
        dispatch(toggleDarkMode())
    }

    const signInOutButton = () => {
        if (appSettings.authDisabled)
            return

        if (currentUser.username)
            return (<Tooltip title="Sign Out">
                <Button color="inherit" onClick={signOutClicked}><Logout /></Button>
            </Tooltip>)
        else
            return (<Tooltip title="Sign In">
                <Button color="inherit" onClick={signInClicked}><Login /></Button>
            </Tooltip>)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                    </Typography>
                    {isEditor() &&
                        (appSettings.manageMode ?
                            <Tooltip title="View">
                                <Button color="inherit" onClick={manageClicked}><Menu /></Button>
                            </Tooltip> :
                            <Tooltip title="Manage">
                                <Button color="inherit" onClick={manageClicked}><MenuOpen /></Button>
                            </Tooltip>)
                    }
                    {isEditor() &&
                        <Tooltip title="Add Item">
                            <Button color="inherit" onClick={addClicked}><PlaylistAdd /></Button>
                        </Tooltip>
                    }
                    {signInOutButton()}
                    {isDarkMode() ?
                        <Tooltip title="Light Mode">
                            <Button color="inherit" onClick={modeSelectClicked}><LightMode fontSize='small' /></Button>
                        </Tooltip>
                        : <Tooltip title="Dark Mode">
                            <Button color="inherit" onClick={modeSelectClicked}><DarkMode fontSize='small' /></Button>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
