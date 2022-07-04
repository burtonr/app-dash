import React, { Component } from "react";
import { Box, Grid } from "@mui/material";

import ItemCard from './itemCard';
import EditDialog from './edit.component';
import itemSvc from '../services/item.service';

export default class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            editItem: {},
            editIsOpen: false,
        };
    }

    componentDidMount() {
        itemSvc.getAllItems()
            .then((response) => {
                const data = response.data
                this.setState({ items: data });
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.itemAdded != prevProps.itemAdded) {
            // Slight delay to ensure the DB is updated before requesting
            setTimeout(() => {
                this.refreshItems()
            }, 1000);
        }
    }

    refreshItems = () => {
        itemSvc.refreshItems()
            .then((response) => {
                const data = response.data
                this.setState({ items: data });
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    deleteItem = (id) => {
        const { handleError } = this.props
        itemSvc.deleteItem(id)
            .then(() => {
                this.refreshItems()
            })
            .catch((err) => {
                console.log(`Error response: ${JSON.stringify(err.response)}`)
                console.log(`Err: ${JSON.stringify(err)}`)
                handleError(err.response)
            });
    }

    editItem = (item) => {
        this.setState(prevState => ({ ...prevState, editIsOpen: true, editItem: item }));
    }

    closeEdit = (shouldUpdate) => {
        this.setState(prevState => ({ ...prevState, editIsOpen: false, editItem: {} }));
        if (shouldUpdate)
            this.refreshItems()
    }

    itemList = () => {
        const { items } = this.state
        const { manageMode } = this.props
        return items.map((currentItem) => {
            return (
                <Grid item xs key={currentItem._id}>
                    <ItemCard
                        item={currentItem}
                        isManaged={manageMode}
                        editClicked={this.editItem}
                        deleteClicked={this.deleteItem}
                    />
                </Grid>
            );
        })
    }

    render() {
        const { editIsOpen, editItem } = this.state
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
                    {this.itemList()}
                </Grid>
                <EditDialog
                    isOpen={editIsOpen}
                    handleClose={this.closeEdit}
                    item={editItem}
                />
            </Box>
        );
    }
}