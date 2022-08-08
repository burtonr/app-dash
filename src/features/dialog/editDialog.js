import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { useUpdateItemMutation } from "../api/apiSlice";
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
    },
    errorMessage: {
        width: 270,
        margin: '0 auto',
        color: 'red',
    }
}

export const EditDialog = () => {
    const isOpen = useSelector(state => state.dialogs.editOpen)
    const editItem = useSelector(state => state.dialogs.editItem)

    const [updateItem, { isLoading, error }] = useUpdateItemMutation()
    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        setTitle(editItem.title)
        setDescription(editItem.description)
        setUrl(editItem.url)
        setImageUrl(editItem.imageUrl)
    }, [isOpen])

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onDescriptionChanged = (e) => setDescription(e.target.value)
    const onUrlChanged = (e) => setUrl(e.target.value)
    const onImageUrlChanged = (e) => setImageUrl(e.target.value)

    const onSaveClicked = async (e) => {
        // DEV: Use .preventDefault() AND .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        e.preventDefault();
        const updatedItem = {
            title,
            description,
            url,
            imageUrl,
            image: editItem.image
        }
        if (title && url) {
            await updateItem({ itemId: editItem._id, updatedItem }).unwrap()
                .then(res => {
                    // TODO: Handle response
                    clearAndClose()
                })
                .catch(err => {
                    setErrorMessage(error?.data?.message ?? err?.data?.message)
                })
        }
    }

    const dialogTitle = () => `Edit ${editItem.title || 'Item'}`

    const clearAndClose = () => {
        dispatch(closeEdit())
    }

    // DEV: value={FIELD || ''} is used to prevent the controlled vs uncontrolled error
    // that happens when this dialog is unmounted and remounted with an undefined state
    return (
        <Dialog open={isOpen} onClose={clearAndClose} style={styles.dialog}>
            <DialogTitle>{dialogTitle()}</DialogTitle>
            <form id="edit-form" onSubmit={onSaveClicked}>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        id="item-title"
                        label="Title"
                        name="title"
                        style={styles.spacedInput}
                        value={title || ''}
                        onChange={onTitleChanged}
                    />
                    <TextField
                        fullWidth
                        id="item-description"
                        label="Description"
                        name="description"
                        style={styles.spacedInput}
                        value={description || ''}
                        onChange={onDescriptionChanged}
                    />
                    <TextField
                        required
                        fullWidth
                        id="item-url"
                        label="URL"
                        name="url"
                        style={styles.spacedInput}
                        value={url || ''}
                        onChange={onUrlChanged}
                    />
                    <TextField
                        fullWidth
                        id="item-imageurl"
                        label="Image URL"
                        name="imageUrl"
                        style={styles.spacedInput}
                        value={imageUrl || ''}
                        onChange={onImageUrlChanged}
                    />
                </DialogContent>
                {errorMessage && <DialogContentText style={styles.errorMessage}><span>{errorMessage}</span></DialogContentText>}
                <DialogActions>
                    <Button onClick={clearAndClose}>Cancel</Button>
                    <Button type="submit" form="edit-form">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );

}
