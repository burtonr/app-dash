import React, { Component } from "react"
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

export default class LoginDialog extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
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
                window.location.reload()
            }, (err) => {
                if (err.response.data) {
                    this.setState({ message: err.response.data.message })
                } else {
                    this.setState({ message: err.response.statusText });
                }
            });
    }

    handleClose() {
        this.setState({
            username: '',
            password: '',
            loading: false,
            message: ''
        })
        window.location.reload()
    }

    render() {
        const { username, password, message } = this.state
        return (
            <Dialog open={this.props.isOpen} onClose={this.handleClose} sx={{ minWidth: 150 }}>
                <DialogTitle>Login to App-Dash</DialogTitle>
                <form id="login-form" onSubmit={this.onSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            autoFocus
                            label="Username"
                            type="test"
                            value={username}
                            onChange={this.onUsernameChange}
                            style={styles.inputField}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={this.onPasswordChange}
                            style={styles.inputField}
                        />
                    </DialogContent>
                    <DialogContentText style={styles.errorMessage}>{message}</DialogContentText>
                    <DialogActions>
                        <Button type="submit" form="login-form">Login</Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}