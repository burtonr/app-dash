import React, { Component } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    TextField,
} from '@mui/material';
import itemSvc from '../services/item.service';

const styles = {
    dialog: {

    },
    spacedInput: {
        padding: '10px'
    },
    selectInput: {
        margin: 10,
    }
}

const initialState = {
    item: {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
    }
}

export default class AddDialog extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({ item: { ...prevState.item, [name]: value } }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { handleClose, handleError } = this.props
        const { item: createdItem } = this.state

        itemSvc.addItem(createdItem)
            .then((res) => {
                // TODO: Create global alert for success and error
                console.log(`Add response data (DB response): ${JSON.stringify(res.data.dbResponse)}`)
                // setUpdated(res.data.addedItem);
            }, (err) => {
                handleError(err.response)
                return;
            })

        this.setState({ ...initialState })
        handleClose(true)
    }

    onCancel = () => {
        const { handleClose } = this.props
        this.setState({ ...initialState })
        handleClose(false)
    }

    render() {
        const { isOpen } = this.props
        const { item } = this.state
        return (
            <Dialog open={isOpen} onClose={this.clearAndClose} style={styles.dialog}>
                <DialogTitle>Add New Item</DialogTitle>
                <form id="add-form" onSubmit={this.onSubmit}>
                    <DialogContent>
                        <TextField
                            required
                            fullWidth
                            id="item-title"
                            label="Title"
                            name="title"
                            style={styles.spacedInput}
                            defaultValue={item.title}
                            onChange={this.onChange}
                        />
                        <TextField
                            fullWidth
                            id="item-description"
                            label="Description"
                            name="description"
                            style={styles.spacedInput}
                            defaultValue={item.description}
                            onChange={this.onChange}
                        />
                        <TextField
                            required
                            fullWidth
                            id="item-url"
                            label="URL"
                            name="url"
                            style={styles.spacedInput}
                            defaultValue={item.url}
                            onChange={this.onChange}
                        />
                        <TextField
                            fullWidth
                            id="item-imageurl"
                            label="Image URL"
                            name="imageUrl"
                            style={styles.spacedInput}
                            defaultValue={item.imageUrl}
                            onChange={this.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCancel}>Cancel</Button>
                        <Button type="submit" form="add-form">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}
