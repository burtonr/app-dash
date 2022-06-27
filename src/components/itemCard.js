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

export default class ItemCard extends Component {
    constructor(props) {
        super(props);
    }

    getCardHeight = () => {
        const { isManaged } = this.props
        return isManaged ? 125 : 75
    }

    setAvatar = () => {
        const { item: { image, imageUrl } } = this.props
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

    render() {
        const { item, isManaged, editClicked, deleteClicked } = this.props

        return (
            <Card variant="outlined" sx={{ width: 275, height: this.getCardHeight() }}>
                <CardActionArea
                    target="_blank"
                    href={item.url}
                    rel="noreferrer noopener"
                >
                    <CardHeader
                        title={item.title}
                        subheader={item.description}
                        avatar={this.setAvatar()}
                    />
                </CardActionArea>
                {isManaged ? <CardActions disableSpacing >
                    <IconButton aria-label="edit" onClick={() => editClicked(item)}>
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => deleteClicked(item._id)}>
                        <Delete />
                    </IconButton>
                </CardActions>
                    : null}
            </Card>
        )
    }
}
