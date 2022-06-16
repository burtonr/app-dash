import React from "react";
import { useLocation } from "react-router-dom";
import {
    Avatar,
    Card,
    CardActions,
    CardActionArea,
    CardHeader,
    IconButton,
} from "@mui/material";

import { Delete, Edit, Label } from '@mui/icons-material';
// import auth from '../services/auth';

const ItemCard = (props) => {
    // const isManaged = useLocation().search === '?manage';
    // const isAdmin = auth.isLoggedIn();
    const cardHeight = 75; // isManaged ? 125 : 75;
    let itemAvatar = (<Avatar><Label /></Avatar>)

    if (props.item.image || props.item.imageUrl) {
        const avatarSrc = 
            props.item.image ? 
                `data:image/${props.item.image.info.format};base64,${props.item.image.data}` :
                props.item.imageUrl
        itemAvatar = (<Avatar
            aria-label="icon"
            src={avatarSrc}
        />)
    }

    return (
        <Card variant="outlined" sx={{ width: 275, height: cardHeight }}>
            <CardActionArea
                target="_blank"
                href={props.item.url}
                rel="noreferrer noopener"
            >
                <CardHeader
                    title={props.item.title}
                    subheader={props.item.description}
                    avatar={itemAvatar}
                />
            </CardActionArea>
            {/* {isAdmin && isManaged ? <CardActions disableSpacing >
                <IconButton aria-label="edit" onClick={() => props.editClick(props.item)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => props.deleteClick(props.item._id)}>
                    <Delete />
                </IconButton>
            </CardActions>
                : null} */}
        </Card>
    );
};

export default ItemCard;