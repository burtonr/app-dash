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

export default class EditDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item: this.props.item
        }
    }

    // TODO: Get list of groups from API/DB
    groups = ['', 'homelab', 'media', 'external']

    onChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({ item: { ...prevState.item, [name]: value } }));
      };

    onSubmit = (e) => {
        e.preventDefault();
        const { handleClose, item: initItem } = this.props
        const { item } = this.state
        const editedItem = { ...initItem, ...item}

        console.log(`Editing existing item: ${JSON.stringify(editedItem.title)}`)
        // itemSvc.updateItem(item._id, editedItem)
        //     .then((res) => {
        //         setUpdated(res.data.updatedItem);
        //     }, (err) => {
        //         console.log('Error');
        //         console.log(err);
        //     })

        handleClose(true)
    }

    render() {
        const { isOpen, handleClose, item: initItem } = this.props
        const { item } = this.state
        // TODO: On submit, the initItem.title changes to `undefined` before closing, so setting fallback text
        const dialogTitle = `Edit ${initItem.title || 'Item'}`
        return (
            <Dialog open={isOpen} onClose={this.clearAndClose} style={styles.dialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <form id="edit-form" onSubmit={this.onSubmit}>
                    <DialogContent>
                        <TextField
                            required
                            fullWidth
                            id="item-title"
                            label="Title"
                            name="title"
                            style={styles.spacedInput}
                            defaultValue={initItem.title}
                            onChange={this.onChange}
                        />
                        <TextField
                            fullWidth
                            id="item-description"
                            label="Description"
                            name="description"
                            style={styles.spacedInput}
                            defaultValue={initItem.description}
                            onChange={this.onChange}
                        />
                        <TextField
                            required
                            fullWidth
                            id="item-url"
                            label="URL"
                            name="url"
                            style={styles.spacedInput}
                            defaultValue={initItem.url}
                            onChange={this.onChange}
                        />
                        <TextField
                            fullWidth
                            id="item-imageurl"
                            label="Image URL"
                            name="imageUrl"
                            style={styles.spacedInput}
                            defaultValue={initItem.imageUrl}
                            onChange={this.onChange}
                        />
                        <TextField
                            fullWidth
                            select
                            id="item-group-select"
                            label="Group"
                            name="group"
                            style={styles.selectInput}
                            value={item.group || ''}
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
                        <Button onClick={() => handleClose(false)}>Cancel</Button>
                        <Button type="submit" form="edit-form">Submit</Button>
                    </DialogActions>
            </form>
            </Dialog>
        );
    }
}
