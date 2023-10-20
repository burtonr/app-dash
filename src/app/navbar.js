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
    Apps,
    Login,
    Logout,
    Menu as MenuIcon,
    PlaylistAdd,
    DarkMode,
    LightMode,
    ViewColumn,
    ViewModule,
    AppRegistration
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleManageMode, toggleGroupMode } from "../features/app/appSlice";
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

    const isGroupMode = () => {
        return appSettings.groupMode
    }

    const manageClicked = () => {
        dispatch(toggleManageMode())
    }

    const addClicked = () => {
        dispatch(openCreate())
    }

    const groupModeClicked = () => {
        dispatch(toggleGroupMode())
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

    const createMenuItem = ({ clickHandler, itemIcon, itemText }) => {
        return (
            <MenuItem onClick={clickHandler}>
                <ListItemIcon>
                    {itemIcon}
                </ListItemIcon>
                {itemText}
            </MenuItem>
        )
    }

    const addItem = () => {
        return createMenuItem({
            clickHandler: addClicked,
            itemIcon: <PlaylistAdd fontSize="small" />,
            itemText: 'Add Item'
        })
    }

    const manageItem = () => {
        const itemIcon = appSettings.manageMode ? <ViewModule fontSize='small' /> : <AppRegistration fontSize='small' />
        const itemText = appSettings.manageMode ? "View Only" : "Manage"

        return createMenuItem({
            clickHandler: manageClicked,
            itemIcon,
            itemText
        })
    }

    const modeSelectItem = () => {
        const itemIcon = isDarkMode() ? <LightMode fontSize='small' /> : <DarkMode fontSize='small' />
        const itemText = isDarkMode() ? "Light Mode" : "Dark Mode"

        return createMenuItem({
            clickHandler: modeSelectClicked,
            itemIcon,
            itemText
        })
    }

    const groupModeItem = () => {

        console.log(`Group mode: ${isGroupMode()}`)

        const itemIcon = isGroupMode() ? <Apps fontSize='small' /> : <ViewColumn fontSize='small' />
        const itemText = isGroupMode() ? "List" : "Grouped"

        return createMenuItem({
            clickHandler: groupModeClicked,
            itemIcon,
            itemText
        })
    }

    const signInOutItem = () => {
        if (appSettings.authDisabled)
            return

        const itemIcon = currentUser.username ? <Logout fontSize="small" /> : <Login fontSize="small" />
        const itemText = currentUser.username ? "Sign Out" : "Sign In"

        return createMenuItem({
            clickHandler: signInOutClicked,
            itemIcon,
            itemText
        })
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
                        {isEditor() && addItem()}
                        {isEditor() && manageItem()}
                        {groupModeItem()}
                        {modeSelectItem()}
                        {signInOutItem()}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
