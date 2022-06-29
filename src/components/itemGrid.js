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
                // groups: [...new Set(data.map(x => x.group))]
                this.setState({ items: data });
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    deleteItem = (id) => {
        console.log(`Deleting: ${JSON.stringify(id)}`)
    //     adminSvc.deleteItem(id)
    //         .then((response) => {
    //             this.setState({
    //                 items: this.state.items.filter((el) => el._id !== id),
    //             });
    //         });
    }

    editItem = (item) => {
        this.setState(prevState => ({ ...prevState, editIsOpen: true, editItem: item }));
        // TODO: Update the item in the items array
    }

    closeEdit = () => {
        this.setState(prevState => ({ ...prevState, editIsOpen: false, editItem: {} }));
        // TODO: Update item list
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
                        editClicked={this.editItem }
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