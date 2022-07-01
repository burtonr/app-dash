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
        group: '',
    }
}

export default class AddDialog extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    // TODO: Get list of groups from API/DB
    groups = ['', 'homelab', 'media', 'external']

    onChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({ item: { ...prevState.item, [name]: value } }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { handleClose, handleError } = this.props
        const { item: createdItem } = this.state


        console.log(`Creating item: ${JSON.stringify(createdItem)}`)
        itemSvc.addItem(createdItem)
            .then((res) => {
                console.log(`Add response data: ${JSON.stringify(res.data)}`)
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
                        <TextField
                            fullWidth
                            select
                            id="item-group-select"
                            label="Group"
                            name="group"
                            style={styles.selectInput}
                            defaultValue={item.group || ''}
                            value={item.group}
                            onChange={this.onChange}
                        >
                            {this.groups.map((group) => (
                                <MenuItem
                                    key={group}
                                    value={group}
                                >
                                    {group}
                                </MenuItem>
                            ))}
                        </TextField>
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
