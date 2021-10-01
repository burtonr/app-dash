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

import { Edit, Delete } from '@mui/icons-material';
import auth from '../services/auth';

const ItemCard = (props) => {
    const isManaged = useLocation().search === '?manage';
    const isAdmin = auth.isLoggedIn();

    return (
        <Card variant="outlined" sx={{ minWidth: 225, maxWidth: 300 }}>
            <CardActionArea
                target="_blank"
                href={props.item.url}
                rel="noreferrer noopener"
            >
                <CardHeader
                    title={props.item.title}
                    subheader={props.item.description}
                    avatar={
                        <Avatar aria-label="icon" src={props.item.imageUrl} />
                    }
                />
            </CardActionArea>
            {isAdmin && isManaged ? <CardActions disableSpacing >
                <IconButton aria-label="edit" onClick={() => props.editClick(props.item)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => props.deleteClick(props.item._id)}>
                    <Delete />
                </IconButton>
            </CardActions>
                : null}
        </Card>
    );
};

export default ItemCard;