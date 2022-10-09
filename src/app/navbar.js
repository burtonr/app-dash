import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    Login,
    Logout,
    Menu as MenuIcon,
    PlaylistAdd,
    DarkMode,
    LightMode,
    Settings,
    ViewModule,
    AppRegistration
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleManageMode } from "../features/app/appSlice";
import { openCreate, openSignIn } from '../features/dialog/dialogSlice'
import { signOut } from "../features/user/userSlice";

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

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

    const signInOutClicked = () => {
        if (currentUser.username)
            dispatch(signOut())


        dispatch(openSignIn())
    }

    const modeSelectClicked = () => {
        dispatch(toggleDarkMode())
    }

    const menuClicked = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const signInOutItem = () => {
        if (appSettings.authDisabled)
            return

        const itemIcon = currentUser.username ? <Logout fontSize="small" /> : <Login fontSize="small" />
        const itemText = currentUser.username ? "Sign Out" : "Sign In"

        return (
            <MenuItem onClick={signInOutClicked}>
                <ListItemIcon>
                    {itemIcon}
                </ListItemIcon>
                {itemText}
            </MenuItem>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                    </Typography>
                    <Tooltip title="Menu">
                        <Button color="inherit" onClick={menuClicked}><MenuIcon /></Button>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="app-dash-menu"
                        open={open}
                        onClose={closeMenu}
                        onClick={closeMenu}
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                        {isEditor() &&
                            <MenuItem onClick={addClicked}>
                                <ListItemIcon>
                                    <PlaylistAdd fontSize="small" />
                                </ListItemIcon>
                                Add Item
                            </MenuItem>
                        }
                        {isEditor() &&
                            <MenuItem onClick={manageClicked}>
                                <ListItemIcon>
                                    {appSettings.manageMode ? <ViewModule fontSize='small' /> : <AppRegistration fontSize='small' />}
                                </ListItemIcon>
                                {appSettings.manageMode ? "View Only" : "Manage"}
                            </MenuItem>
                        }
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={modeSelectClicked}>
                            <ListItemIcon>
                                {isDarkMode() ? <LightMode fontSize='small' /> : <DarkMode fontSize='small' />}
                            </ListItemIcon>
                            {isDarkMode() ? "Light Mode" : "Dark Mode"}
                        </MenuItem>
                        {signInOutItem()}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
