import React from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardActionArea,
    CardHeader,
    IconButton,
} from "@mui/material";

import { Delete, Edit, Label } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { openEdit } from '../dialog/dialogSlice';
import { useDeleteItemMutation } from '../api/apiSlice'
import { addSuccess } from "../notifications/notificationsSlice";

export const ItemCard = (item) => {
    const { item: data } = item
    const dispatch = useDispatch()
    const [deleteItem, { error }] = useDeleteItemMutation()
    const isManaged = useSelector(state => state.app.manageMode)
    const getCardHeight = () => {
        return isManaged ? 125 : 75
    }

    const setAvatar = () => {
        const { image, imageUrl } = data
        if (image || imageUrl) {
            const avatarSrc =
                image ?
                    `data:image/${image.info.format};base64,${image.data}` :
                    imageUrl
            return (<Avatar
                aria-label="icon"
                src={avatarSrc}
            />)
        } else {
            return (<Avatar><Label /></Avatar>)
        }
    }

    const editItemClicked = (item) => {
        dispatch(openEdit(item))
    }

    const deleteItemClicked = async (item) => {
        await deleteItem(item._id)
        dispatch(addSuccess(`Deleted ${item.title}`))
    }


    return (
        <Card variant="outlined" sx={{ width: 275, height: getCardHeight() }}>
            <CardActionArea
                target="_blank"
                href={data.url}
                rel="noreferrer noopener"
            >
                <CardHeader
                    title={data.title}
                    subheader={data.description}
                    avatar={setAvatar()}
                />
            </CardActionArea>
            {isManaged ? <CardActions disableSpacing >
                <IconButton aria-label="edit" onClick={() => editItemClicked(data)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteItemClicked(data)}>
                    <Delete />
                </IconButton>
            </CardActions>
                : null}
        </Card>
    )

}
