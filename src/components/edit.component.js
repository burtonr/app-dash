import React, { Component } from "react";
// import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import itemSvc from '../services/item.service';

const styles = {
    spacedInput: {
        padding: '10px'
    }
}

export default class EditDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNew: false,
            item: {
                title: '',
                description: '',
                url: '',
                imageUrl: '',
            }
        }
    }

    onChangeItemTitle = (e) => {
        this.setState({ item: { title: e.target.value } });
    }

    onChangeItemUrl = (e) => {
        this.setState({ item: { url: e.target.value } });
    }

    onChangeItemDescription = (e) => {
        this.setState({ item: { description: e.target.value } });
    }

    onChangeItemImageUrl = (e) => {
        this.setState({ item: { imageUrl: e.target.value } });
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('Submit changes')
        // const editedItem = {
        //     title: itemTitle,
        //     url: itemUrl,
        //     description: itemDescription,
        //     imageUrl: itemImageUrl,
        // };

        // if (isNew) {
        //     itemSvc.addItem(editedItem)
        //         .then((res) => {
        //             setUpdated(res.data.updatedItem);
        //         }, (err) => {
        //             console.error('Error saving new item');
        //             console.error(err);
        //         })
        // } else {
        //     itemSvc.updateItem(item._id, editedItem)
        //         .then((res) => {
        //             setUpdated(res.data.updatedItem);
        //         }, (err) => {
        //             console.log('Error');
        //             console.log(err);
        //         })
        // }

    //     handleClose();
    }

    // handleClose = () => {
    //     handleCloseDialog(true);
    // };

    render() {
        const { isOpen, handleClose } = this.props
        const { isNew, item } = this.state
        return (
            <Dialog open={isOpen} onClose={handleClose}>
                {isNew ? <DialogTitle>Add Item</DialogTitle> : <DialogTitle>Edit Item</DialogTitle>}
                <form id="edit-form" onSubmit={this.onSubmit}>
                    <DialogContent>
                        <TextField
                            required
                            fullWidth
                            id="item-title"
                            label="Title"
                            style={styles.spacedInput}
                            defaultValue={item.title}
                            onChange={this.onChangeItemTitle}
                        />
                        <TextField
                            fullWidth
                            id="item-description"
                            label="Description"
                            style={styles.spacedInput}
                            defaultValue={item.description}
                            onChange={this.onChangeItemDescription}
                        />
                        <TextField
                            required
                            fullWidth
                            id="item-url"
                            label="URL"
                            style={styles.spacedInput}
                            defaultValue={item.url}
                            onChange={this.onChangeItemUrl}
                        />
                        <TextField
                            fullWidth
                            id="item-imageurl"
                            label="Image URL"
                            style={styles.spacedInput}
                            defaultValue={item.imageUrl}
                            onChange={this.onChangeItemImageUrl}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="edit-form">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

// export default function Edit({ isOpen, handleCloseDialog, item, setUpdatedItem }) {
//     let isNew = false;
//     if (!item) {
//         isNew = true;
//         item = {
//             title: '',
//             description: '',
//             imageUrl: ''
//         }
//     }

//     useEffect(() => {
//         setItemTitle(item.title);
//         setItemDescription(item.description);
//         setItemUrl(item.url);
//         setItemImageUrl(item.imageUrl);
//     }, [item.title, item.description, item.url, item.imageUrl])

    
//     const setUpdated = (newItem) => {
//         setUpdatedItem(newItem)
//     }

    
// }