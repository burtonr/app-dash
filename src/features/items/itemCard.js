import React, { Component } from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardActionArea,
    CardHeader,
    IconButton,
} from "@mui/material";

import { Delete, Edit, Label } from '@mui/icons-material';

export const ItemCard = (item) => {
    const { item: data } = item
    console.log(`ItemCard -> item: ${JSON.stringify(data)}`)
    const isManaged = false
    const getCardHeight = () => {
        // const { isManaged } = this.props
        // return isManaged ? 125 : 75
        return 75
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

    return (
        // const { item, isManaged, editClicked, deleteClicked } = this.props

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
                <IconButton aria-label="edit" onClick={() => editClicked(data)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteClicked(data._id)}>
                    <Delete />
                </IconButton>
            </CardActions>
                : null}
        </Card>
    )

}
