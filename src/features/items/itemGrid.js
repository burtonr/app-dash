import React, { useEffect } from 'react'
import { Box, Grid } from "@mui/material";

import { ItemCard } from './itemCard';
import { usePrefetch } from "../api/apiSlice";
import { useSelector } from 'react-redux';

export const ItemGrid = () => {
    const prefetchItems = usePrefetch('getItems')
    useEffect(() => {
        prefetchItems()
    }, [])
    const itemState = useSelector(state => state.items)
    const items = itemState.items
    const groups = itemState.groups

    // TODO: groups map -> container

    return (
        <Box m="auto"
            display="flex"
            width="80%"
            alignItems="center"
            justifyContent="center"
            paddingTop="10px"
        >
            <Grid container
                direction="row"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {items.map((currentItem) => (
                    <Grid item xs key={currentItem._id}>
                        <ItemCard item={currentItem} />
                    </Grid>))}
            </Grid>
        </Box>
    )
}