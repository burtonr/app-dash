import React, { useState } from 'react'
import {
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
    TextField
} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from '../api/apiSlice'
import { closeSignIn } from './dialogSlice'
import { addError } from '../notifications/notificationsSlice';

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
    const { hasError, errorMessage } = useSelector(state => state.notifications)
    const [signIn] = useSignInMutation()

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const clearAndClose = () => {
        setUsername('')
        setPassword('')
        setErrorMessage('')
        dispatch(closeSignIn())
    }

    const onSignInClicked = async (e) => {
        // DEV: Use .preventDefault() AND .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        e.preventDefault();
        if (username && password) {
            setIsLoading(true)
            await signIn({ username, password }).unwrap()
                .then(res => {
                    clearAndClose()
                })
                .catch(err => {
                    dispatch(addError(err))
                })
                .finally(() => setIsLoading(false))
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
                    {isLoading && <LinearProgress />}
                    {hasError && <Alert severity="error">{errorMessage}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button type="submit" form="login-form">Login</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}