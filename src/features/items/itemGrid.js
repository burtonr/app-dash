import React, { useEffect } from 'react'
import { Box, Grid, Stack } from "@mui/material";

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
                {groups.map((currentGroup) => (
                    <Grid spacing={2} item key={currentGroup}>
                        <h3>{currentGroup}</h3>
                        {items
                            .filter(x => x.group === currentGroup)
                            .map((currentItem) => (
                                <Stack spacing={6}>
                                    <ItemCard item={currentItem} />
                                </Stack>
                            ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}