import React, { Component } from "react";
import { Box, Grid } from "@mui/material";

import ItemCard from './itemCard';
// import EditDialog from './editDialog';
// import adminSvc from '../services/admin';
import itemSvc from '../services/item.service';

export default class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [],
            editItem: {},
            editIsOpen: false,
            loginIsOpen: false,
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
        console.log(`Editing: ${JSON.stringify(item)}`)
    //     this.setState({ editItem: item });
    //     this.setState({ editIsOpen: true });
    }

    // updateItem = (item) => {
    //     let updatedItems = this.state.items;
    //     let idx = updatedItems.findIndex(x => x._id === item._id)
    //     updatedItems[idx] = item;
    //     this.setState({ items: updatedItems})
    // }

    // closeEdit = () => {
    //     this.setState({ editItem: {} });
    //     this.setState({ editIsOpen: false });
    // }

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
                {/* <EditDialog 
                    isOpen={this.state.editIsOpen}
                    handleCloseDialog={() => this.closeEdit(true)}
                    item={this.state.editItem}
                    setUpdatedItem={(i) => this.updateItem(i)}
                /> */}
            </Box>
        );
    }
}