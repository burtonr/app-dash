import React, { useState } from 'react'
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
import { useEditItemMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeEdit } from './dialogSlice'

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

export const EditDialog = (item) => {
    const isOpen = useSelector(state => state.editOpen)
    const {
        data: item
    } = useGetItemQuery(item.id)

    const [updateItem, { isLoading }] = useEditItemMutation()
    const dispatch = useDispatch()

    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const [url, setUrl] = useState(item.url)
    const [imageUrl, setImageUrl] = useState(item.imageUrl)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onDescriptionChanged = (e) => setDescription(e.target.value)
    const onUrlChanged = (e) => setUrl(e.target.value)
    const onImageUrlChanged = (e) => setImageUrl(e.target.value)

    const onSaveClicked = async () => {
        if (title && url) {
            await updateItem(item)
            // close dialog
        }
    }

    const dialogTitle = () => `Edit ${initItem.title || 'Item'}`

    const clearAndClose = () => {
        dispatch(closeEdit())
    }

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         item: this.props.item
    //     }
    // }

    // onChange = e => {
    //     const { name, value } = e.target;
    //     this.setState(prevState => ({ item: { ...prevState.item, [name]: value } }));
    // };

    // onSubmit = (e) => {
    //     e.preventDefault();
    //     const { handleClose, item: initItem } = this.props
    //     const { item } = this.state //edited fields
    //     const editedItem = { ...initItem, ...item }

    //     itemSvc.updateItem(editedItem._id, editedItem)
    //         .then((res) => {
    //             // TODO: Create global alert for success and error
    //             console.log(`Edit response data (DB response): ${JSON.stringify(res.data.dbResponse)}`)
    //             handleClose(true)
    //         }, (err) => {
    //             // TODO: Pass error response up to alert
    //             console.log('Error');
    //             console.log(err);
    //             handleClose(false)
    //         })
    // }

    return (
        // const { isOpen, handleClose, item: initItem } = this.props
        // const { item } = this.state
        // // TODO: On submit, the initItem.title changes to `undefined` before closing, so setting fallback text
        // const dialogTitle = `Edit ${initItem.title || 'Item'}`
        <Dialog open={isOpen} onClose={clearAndClose} style={styles.dialog}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <form id="edit-form" onSubmit={onSaveClicked}>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        id="item-title"
                        label="Title"
                        name="title"
                        style={styles.spacedInput}
                        defaultValue={title}
                        onChange={onTitleChanged}
                    />
                    <TextField
                        fullWidth
                        id="item-description"
                        label="Description"
                        name="description"
                        style={styles.spacedInput}
                        defaultValue={description}
                        onChange={onDescriptionChanged}
                    />
                    <TextField
                        required
                        fullWidth
                        id="item-url"
                        label="URL"
                        name="url"
                        style={styles.spacedInput}
                        defaultValue={url}
                        onChange={onUrlChanged}
                    />
                    <TextField
                        fullWidth
                        id="item-imageurl"
                        label="Image URL"
                        name="imageUrl"
                        style={styles.spacedInput}
                        defaultValue={imageUrl}
                        onChange={onImageUrlChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancel</Button>
                    <Button type="submit" form="edit-form">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );

}
