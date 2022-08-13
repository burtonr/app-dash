import React, { useState } from 'react'
import {
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
    TextField,
} from '@mui/material';
import { useAddItemMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeCreate } from './dialogSlice'
import { addError } from '../notifications/notificationsSlice';

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

export const CreateDialog = () => {
    const isOpen = useSelector(state => state.dialogs.createOpen)
    const [addItem] = useAddItemMutation()
    const dispatch = useDispatch()
    const { hasError, errorMessage } = useSelector(state => state.notifications)

    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onDescriptionChanged = (e) => setDescription(e.target.value)
    const onUrlChanged = (e) => setUrl(e.target.value)
    const onImageUrlChanged = (e) => setImageUrl(e.target.value)

    const clearAndClose = () => {
        setTitle('')
        setDescription('')
        setUrl('')
        setImageUrl('')
        dispatch(closeCreate())
    }

    const onSaveClicked = async (e) => {
        // DEV: Use .preventDefault() AND .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        e.preventDefault();
        if (title && url) {
            setIsLoading(true)
            await addItem({ title, description, url, imageUrl }).unwrap()
                .then(res => {
                    clearAndClose()
                })
                .catch(err => {
                    dispatch(addError(err))
                })
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <Dialog open={isOpen} onClose={clearAndClose} style={styles.dialog}>
            <DialogTitle>Add New Item</DialogTitle>
            <form id="add-form" onSubmit={onSaveClicked}>
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
                    {isLoading && <LinearProgress />}
                    {hasError && <Alert severity="error">{errorMessage}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearAndClose}>Cancel</Button>
                    <Button type="submit" form="add-form" disabled={isLoading}>Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
