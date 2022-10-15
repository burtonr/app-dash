import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSignInMutation } from '../api/apiSlice'
import { closeSignIn } from './dialogSlice'
import { addError, addSuccess } from '../notifications/notificationsSlice';

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

    const clearAndClose = () => {
        formik.resetForm()
        dispatch(closeSignIn())
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    })

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSignInClicked(values)
        }
    })

    const onSignInClicked = async (values) => {
        // DEV: Use .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        const { username, password } = values
        if (username && password) {
            setIsLoading(true)
            await signIn({ username, password }).unwrap()
                .then(res => {
                    dispatch(addSuccess(`Signed in as ${username}`))
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
            <DialogTitle>Sign in to App-Dash</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        id="login-username"
                        label="Username"
                        name="username"
                        style={styles.inputField}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        id="login-password"
                        label="Password"
                        name="password"
                        type={'password'}
                        style={styles.inputField}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    {isLoading && <LinearProgress />}
                    {hasError && <Alert severity="error">{errorMessage}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button type="submit" disabled={isLoading}>Sign In</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}