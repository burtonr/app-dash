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
    const [signIn, { error }] = useSignInMutation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const clearAndClose = () => {
        setUsername('')
        setPassword('')
        dispatch(closeSignIn())
    }

    const onSignInClicked = async (e) => {
        // DEV: Use .preventDefault() AND .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        e.preventDefault();
        if (username && password) {                        
            await signIn({ username, password }).unwrap()
            .then(res => {
                // TODO: Handle response
                clearAndClose()
            })
            .catch(err => {
                // TODO: Handle errors
                console.log(`.catch -> Error: ${JSON.stringify(error)}`)
                console.log(`.catch -> Err: ${JSON.stringify(err)}`)
            })
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