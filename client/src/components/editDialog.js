import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import admin from '../services/admin';

export default function Edit({ isOpen, handleCloseDialog, item }) {
    let isNew = false;
    if(!item) {
        isNew = true;
        item = {
            title: '',
            description: '',
            imageUrl: ''
        }
    }

    const [itemTitle, setitemTitle] = useState();
    const [itemDescription, setItemDescription] = React.useState(item.description);
    const [itemUrl, setItemUrl] = React.useState(item.url);
    const [itemImageUrl, setItemImageUrl] = React.useState(item.imageUrl);

    const onChangeItemTitle = (e) => {
        setitemTitle(e.target.value);
    }

    const onChangeItemUrl = (e) => {
        setItemUrl(e.target.value);
    }

    const onChangeItemDescription = (e) => {
        setItemDescription(e.target.value);
    }

    const onChangeItemImageUrl = (e) => {
        setItemImageUrl(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const editedItem = {
            title: itemTitle,
            url: itemUrl,
            description: itemDescription,
            imageUrl: itemImageUrl,
        };

        console.log('Edited item:');
        console.log(editedItem.title);
        console.log(editedItem.url);
        console.log(editedItem.description);
        console.log(editedItem.imageUrl);

        if(isNew) {
            admin.addItem(editedItem)
                .then(() => {

                }, (err) => {

                })
        } else {
            admin.updateItem(item._id, editedItem)  
                .then((res) => {
                    console.log('Success');
                    console.log(res);
                }, (err) => {
                    console.log('Error');
                    console.log(err);
                })
        }

        handleClose();
    }

    const handleClose = () => {
        handleCloseDialog(true);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            {isNew ? <DialogTitle>Add Item</DialogTitle> : <DialogTitle>Edit Item</DialogTitle>}
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    id="item-title"
                    label="Title"
                    defaultValue={item.title}
                    onChange={onChangeItemTitle}
                />
                <TextField
                    fullWidth
                    id="item-description"
                    label="Description"
                    defaultValue={item.description}
                    onChange={onChangeItemDescription}
                />
                <TextField
                    required
                    fullWidth
                    id="item-url"
                    label="URL"
                    defaultValue={item.url}
                    onChange={onChangeItemUrl}
                />
                <TextField
                    fullWidth
                    id="item-imageurl"
                    label="Image URL"
                    defaultValue={item.imageUrl}
                    onChange={onChangeItemImageUrl}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}