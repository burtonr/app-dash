import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import admin from '../services/admin';

export default function Edit ({ isOpen, handleCloseDialog, item }) {
    let isNew = false;
    if(!item) {
        isNew = true;
        item = {
            title: '',
            description: '',
            imageUrl: ''
        }
    }

    const [itemTitle, setItemTitle] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemUrl, setItemUrl] = useState();
    const [itemImageUrl, setItemImageUrl] = useState();

    useEffect(() => {
        setItemTitle(item.title);
        setItemDescription(item.description);
        setItemUrl(item.url);
        setItemImageUrl(item.imageUrl);
    }, [item.title, item.description, item.url, item.imageUrl])

    const onChangeItemTitle = (e) => {
        setItemTitle(e.target.value);
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

    const spacedInput = {
        padding: '10px'
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            {isNew ? <DialogTitle>Add Item</DialogTitle> : <DialogTitle>Edit Item</DialogTitle>}
            <form id="edit-form" onSubmit={onSubmit}>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        id="item-title"
                        label="Title"
                        style={spacedInput}
                        defaultValue={item.title}
                        onChange={onChangeItemTitle}
                    />
                    <TextField
                        fullWidth
                        id="item-description"
                        label="Description"
                        style={spacedInput}
                        defaultValue={item.description}
                        onChange={onChangeItemDescription}
                    />
                    <TextField
                        required
                        fullWidth
                        id="item-url"
                        label="URL"
                        style={spacedInput}
                        defaultValue={item.url}
                        onChange={onChangeItemUrl}
                    />
                    <TextField
                        fullWidth
                        id="item-imageurl"
                        label="Image URL"
                        style={spacedInput}
                        defaultValue={item.imageUrl}
                        onChange={onChangeItemImageUrl}
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