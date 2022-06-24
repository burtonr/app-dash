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
    isNew: true,
    item: {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
        group: '',
    }
}

export default class EditDialog extends Component {
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
        const { handleClose } = this.props
        const { isNew, item: editedItem } = this.state

        if (isNew) {
            console.log(`Creating new item: ${JSON.stringify(editedItem)}`)
            // itemSvc.addItem(editedItem)
            //     .then((res) => {
            //         setUpdated(res.data.updatedItem);
            //     }, (err) => {
            //         console.error('Error saving new item');
            //         console.error(err);
            //     })
        } else {
            console.log(`Editing existing item: ${JSON.stringify(editedItem)}`)
            // itemSvc.updateItem(item._id, editedItem)
            //     .then((res) => {
            //         setUpdated(res.data.updatedItem);
            //     }, (err) => {
            //         console.log('Error');
            //         console.log(err);
            //     })
        }

        this.clearAndClose();
    }

    clearAndClose = () => {
        const { handleClose } = this.props
        this.setState({...initialState})
        handleClose()
    }

    render() {
        const { isOpen } = this.props
        const { isNew, item } = this.state
        const titleText = isNew ? 'Add Item' : 'Edit Item'
        const groups = ['', 'local', 'web', 'admin']
        return (
            <Dialog open={isOpen} onClose={this.clearAndClose} style={styles.dialog}>
                <DialogTitle>{titleText}</DialogTitle>
                <form id="edit-form" onSubmit={this.onSubmit}>
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
                            defaultValue={item.group}
                            value={item.group}
                            onChange={this.onChange}
                            >
                            {groups.map((group) => (
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
                        <Button onClick={this.clearAndClose}>Cancel</Button>
                        <Button type="submit" form="edit-form">Submit</Button>
                    </DialogActions>
            </form>
            </Dialog>
        );
    }
}
