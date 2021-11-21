import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
import auth from '../services/auth';
import EditDialog from './editDialog';
import LoginDialog from './loginDialog';

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(auth.isLoggedIn());
    const manageMode = useLocation().search === '?manage';

    const openEdit = () => {
        setEditOpen(true);
    }

    const closeEdit = () => {
        setEditOpen(false);
    }

    const openLogin = () => {
        setLoginOpen(true);
    }

    const closeLogin = () => {
        setLoginOpen(false);
    }

    const setAdmin = () => {
        setIsAdmin(true);
    }

    const removeAdmin = () => {
        auth.logout();
        setIsAdmin(false);
    }

    const modeButton = () => {
        if (isAdmin) {
            if (manageMode) {
                return <Tooltip title="View">
                    <Button color="inherit" component={NavLink} to="/"><Menu /></Button>
                </Tooltip>
            } else {
                return <Tooltip title="Manage">
                    <Button color="inherit" component={NavLink} to="?manage"><MenuOpen /></Button>
                </Tooltip>
            }
        } else {
            return null;
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                    </Typography>
                    { modeButton() }
                    { isAdmin ? 
                        <Tooltip title="Add Item">
                            <Button color="inherit" onClick={() => openEdit()}><PlaylistAdd /></Button>
                        </Tooltip>
                    : null }
                    {isAdmin ?
                        <Tooltip title="Logout">
                            <Button color="inherit" onClick={() => removeAdmin()}><Logout /></Button>
                        </Tooltip> :
                        <Tooltip title="Login">
                            <Button color="inherit" onClick={() => openLogin()}><Login /></Button>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>
            {/* TODO: Update the item list when a new item is added */}
            <EditDialog isOpen={editOpen} handleCloseDialog={closeEdit} setUpdatedItem={() => null } />
            <LoginDialog isOpen={loginOpen} handleCloseDialog={closeLogin} handleSuccess={setAdmin} />
        </Box>
    );
};

export default Navbar;