import React, { useState } from 'react'
import {
    Alert,
    Dialog,
    DialogTitle,
} from '@mui/material';
import { useAddItemMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeCreate } from './dialogSlice'
import { addError, addSuccess } from '../notifications/notificationsSlice';
import { ItemForm } from './itemForm';

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
    // const { hasError, errorMessage } = useSelector(state => state.notifications)

    const [isLoading, setIsLoading] = useState(false)

    const clearAndClose = () => {
        dispatch(closeCreate())
    }

    const onSaveClicked = async (values) => {
        const { title, description, url, imageUrl } = values

        // DEV: Use .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        if (title && url) {
            setIsLoading(true)
            await addItem({ title, description, url, imageUrl }).unwrap()
                .then(res => {
                    dispatch(addSuccess(`Added ${title}`))
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
            <ItemForm
                initialValues={{ title: '', description: '', url: '', imageUrl: '' }}
                onFormSubmit={onSaveClicked}
                onClose={clearAndClose}
                isLoading={isLoading}
            />
            {/* 
                TODO: Test with server error. Is this still needed???
                {hasError && <Alert severity="error">{errorMessage}</Alert>}
            */}
        </Dialog>
    )
}
