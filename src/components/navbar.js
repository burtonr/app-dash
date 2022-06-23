import React, { Component } from "react";
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
import authService from "../services/auth.service";
// import EditDialog from './editDialog';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user) {
            this.setState({ currentUser: user })
        }
    }

    // const [editOpen, setEditOpen] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(auth.isLoggedIn());
    // const manageMode = useLocation().search === '?manage';

    // const openEdit = () => {
    //     setEditOpen(true);
    // }

    // const closeEdit = () => {
    //     setEditOpen(false);
    // }

    // // Note: Reload the page on item added. Probably a better way, but don't want to introduce additional dependencies
    // const reloadPage = () => {
    //     window.location.reload();
    // }

    // const modeButton = () => {
    //     if (isAdmin) {
    //         if (manageMode) {
    //             return <Tooltip title="View">
    //                 <Button color="inherit" component={NavLink} to="/"><Menu /></Button>
    //             </Tooltip>
    //         } else {
    //             return <Tooltip title="Manage">
    //                 <Button color="inherit" component={NavLink} to="?manage"><MenuOpen /></Button>
    //             </Tooltip>
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    logout = () => {
        console.log('Logging out...');
        authService.logout();
        // TODO: Route to public only page
        this.setState({ currentUser: undefined })
    }

    render() {
        // TODO: Use actual auth...
        const isEditor = true;
        const { currentUser } = this.state
        const { loginClicked, editClicked } = this.props
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button color="inherit" component={NavLink} to="/">App Dash</Button>
                        </Typography>
                        {/* { modeButton() } */}
                        {(currentUser && isEditor) &&
                            <Tooltip title="Add Item">
                                <Button color="inherit" onClick={editClicked}><PlaylistAdd /></Button>
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
                {/* <EditDialog isOpen={editOpen} handleCloseDialog={closeEdit} setUpdatedItem={reloadPage} /> */}
            </Box>
        )
    };
}
