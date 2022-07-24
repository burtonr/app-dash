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
// import itemSvc from '../services/item.service';
import { useAddItemMutation } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeCreate } from './dialogSlice'

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

// const initialState = {
//     item: {
//         title: '',
//         description: '',
//         url: '',
//         imageUrl: '',
//     }
// }

export const CreateDialog = () => {
    const isOpen = useSelector(state => state.dialogs.createOpen)
    const [addItem, { isLoading }] = useAddItemMutation()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onDescriptionChanged = (e) => setDescription(e.target.value)
    const onUrlChanged = (e) => setUrl(e.target.value)
    const onImageUrlChanged = (e) => setImageUrl(e.target.value)

    // constructor(props) {
    //     super(props)
    //     this.state = initialState
    // }

    // onChange = e => {
    //     const { name, value } = e.target;
    //     this.setState(prevState => ({ item: { ...prevState.item, [name]: value } }));
    // };

    // onSubmit = (e) => {
    //     e.preventDefault();
    //     const { handleClose, handleError } = this.props
    //     const { item: createdItem } = this.state

    //     itemSvc.addItem(createdItem)
    //         .then((res) => {
    //             // TODO: Create global alert for success and error
    //             console.log(`Add response data (DB response): ${JSON.stringify(res.data.dbResponse)}`)
    //             // setUpdated(res.data.addedItem);
    //         }, (err) => {
    //             handleError(err.response)
    //             return;
    //         })

    //     this.setState({ ...initialState })
    //     handleClose(true)
    // }
    const clearAndClose = () => {
        dispatch(closeCreate())
    }

    const onSaveClicked = async () => {
        if (title && url) {
            await updateItem(item)
            // close dialog
        }
    }
    // onCancel = () => {
    //     const { handleClose } = this.props
    //     this.setState({ ...initialState })
    //     handleClose(false)
    // }

    return (
        // const { isOpen } = this.props
        // const { item } = this.state
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearAndClose}>Cancel</Button>
                    <Button type="submit" form="add-form">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
