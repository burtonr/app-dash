import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from '../api/apiSlice'
import { closeSignIn } from './dialogSlice'

const styles = {
    inputField: {
        margin: 10
    },
    errorMessage: {
        width: 270,
        margin: '0 auto',
        color: 'red',
    }
}

export const SignInDialog = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state => state.dialogs.signInOpen)
    const [signIn] = useSignInMutation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const clearAndClose = () => {
        setUsername('')
        setPassword('')
        dispatch(closeSignIn())
    }

    const onSignInClicked = async () => {
        if (username && password) {
            await signIn({ username, password })
        }
    }

    return (
        <Dialog open={isOpen} onClose={clearAndClose} sx={{ minWidth: 150 }}>
            <DialogTitle>Login to App-Dash</DialogTitle>
            <form id="login-form" onSubmit={onSignInClicked}>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        label="Username"
                        type="test"
                        value={username}
                        onChange={onUsernameChanged}
                        style={styles.inputField}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                        style={styles.inputField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" form="login-form">Login</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}