import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@mui/material';
import auth from "../services/auth";

export default function LoginDialog({ isOpen, handleCloseDialog, handleSuccess }) {
    const [password, setpassword] = useState();
    const [message, setMessage] = useState();
    
    const onChangePassword = (e) => {
        setpassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        auth.login(password)
            .then(() => {
                handleSuccess();
                handleClose();
            }, (err) => {
                if(err.response.data) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage(err.response.statusText);
                }
            });
    }

    const handleClose = () => {
        handleCloseDialog(true);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} sx={{ minWidth: 150 }}>
            <DialogTitle>Enter Admin Password</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    id="admin-password"
                    label="Password"
                    type="password"
                    onChange={onChangePassword}
                />
            </DialogContent>
            <DialogContentText>{message}</DialogContentText>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit}>Login</Button>
            </DialogActions>
        </Dialog>
    );
}