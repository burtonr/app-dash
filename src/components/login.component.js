import React,  { Component } from "react"
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@mui/material'
import authService from "../services/auth.service"

export default class LoginDialog extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        }
    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        const { username, password } = this.state
        e.preventDefault();
        this.setState({ message: '', loading: true })

        authService.login(username, password)
            .then(() => {
                this.props.history.push('/')
                window.location.reload()
            }, (err) => {
                if (err.response.data) {
                    this.setState({ message: err.response.data.message })
                } else {
                    this.setState({ message: err.response.statusText });
                }
            });
    }

    handleClose()  {
        console.log('closed  dialog')
    }

    render() {
        const { username, password, message } = this.state
        return (
            <Dialog open={this.props.isOpen} onClose={this.handleClose} sx={{ minWidth: 150 }}>
                <DialogTitle>Enter Admin Password</DialogTitle>
                <form id="login-form" onSubmit={this.onSubmit}>
                    <DialogContent>
                    <TextField
                            required
                            fullWidth
                            autoFocus
                            label="Username"
                            type="test"
                            value={username}
                            onChange={this.onUsernameChange}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={this.onPasswordChange}
                        />
                    </DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <DialogActions>
                        <Button type="submit" form="login-form">Login</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}