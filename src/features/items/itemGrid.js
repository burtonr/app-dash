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
    const groupMode = useSelector(state => state.app.groupMode)

    const items = itemState.items
    const groups = itemState.groups

    const renderGroups = () => {
        let ungroupedItems = <Box m={2}
            width={300}
            paddingBottom={4}
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
            justifyContent="start"
            border={1}
            borderRadius={2}
            key={'ungrouped'}
        >
            <h3>Ungrouped</h3>
            <Stack key={'ungrouped-stack'} spacing={2}>
                {items
                    .filter(x => x.group === '')
                    .map((currentItem) => (
                        <ItemCard key={`${currentItem._id}-itemCard`} item={currentItem} />
                    ))}
            </Stack>
        </Box>

        let groupedItems = groups.map((currentGroup) => (
            <Box m={2}
                width={300}
                paddingBottom={4}
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
                justifyContent="start"
                border={1}
                borderRadius={2}
                key={currentGroup}
            >
                <h3>{currentGroup}</h3>
                <Stack key={`${currentGroup}-stack`} spacing={2}>
                    {items
                        .filter(x => x.group === currentGroup)
                        .map((currentItem) => (
                            <ItemCard key={`${currentItem._id}-itemCard`} item={currentItem} />
                        ))}
                </Stack>
            </Box>
        ))

        return [ ungroupedItems, ...groupedItems]
    }

    const renderItems = () => {
        return items.map((currentItem) => (
            <Grid item xs key={currentItem._id}>
                <ItemCard item={currentItem} />
            </Grid>
        ))
    }

    return (
        <Box m="auto"
            display="flex"
            maxWidth="95%"
            alignItems="center"
            justifyContent="center"
            paddingTop="30px"
        >
            <Grid container
                direction="row"
                justifyContent="center"
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {groupMode ? renderGroups() : renderItems()}
            </Grid>
        </Box>
    )
}