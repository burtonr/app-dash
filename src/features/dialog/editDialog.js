import React, { useState } from 'react'
import {
    Alert,
    Dialog,
    DialogTitle
} from '@mui/material';
import { useUpdateItemMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeEdit } from './dialogSlice'
import { addError, addSuccess } from '../notifications/notificationsSlice';
import { ItemForm } from './itemForm';

const styles = {
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
    // const { hasError, errorMessage } = useSelector(state => state.notifications)

    const [updateItem] = useUpdateItemMutation()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const onSaveClicked = async (values) => {
        // DEV: Use .preventDefault() AND .unwrap() as the Form Dialog closes before the request completes
        // causing a fetch NetworkError that is not otherwise caught by RTK Query
        const updatedItem = {
            ...values,
            image: editItem.image
        }
        if (title && url) {
            setIsLoading(true)
            await updateItem({ itemId: editItem._id, updatedItem }).unwrap()
                .then(res => {
                    dispatch(addSuccess(`Updated ${updatedItem.title}`))
                    clearAndClose()
                })
                .catch(err => {
                    dispatch(addError(err))
                })
                .finally(() => setIsLoading(false))
        }
    }

    const dialogTitle = () => `Edit ${editItem.title || 'Item'}`

    const clearAndClose = () => {
        dispatch(closeEdit())
    }

    return (
        <Dialog open={isOpen} onClose={clearAndClose} style={styles.dialog}>
            <DialogTitle>{dialogTitle()}</DialogTitle>
            <ItemForm
                initialValues={{ ...editItem }}
                onFormSubmit={onSaveClicked}
                onClose={clearAndClose}
                isLoading={isLoading}
            />
            {/* {hasError && <Alert severity="error">{errorMessage}</Alert>} */}

        </Dialog>
    );

}
