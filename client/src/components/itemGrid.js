import React, { Component } from "react";
import { Box, Grid } from "@mui/material";

import ItemCard from './itemCard';
import EditDialog from './editDialog';
import LoginDialog from './loginDialog';
import adminSvc from '../services/admin';
import itemSvc from '../services/item';

export default class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
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
                this.setState({ items: response.data });
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    deleteItem(id) {
        adminSvc.deleteItem(id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    items: this.state.items.filter((el) => el._id !== id),
                });
            });
    }

    editItem(item) {
        this.setState({ editItem: item });
        this.setState({ editIsOpen: true });
    }

    closeEdit() {
        this.setState({ editItem: {} });
        this.setState({ editIsOpen: false });
    }

    closeLogin = () => {
        this.setState({ loginIsOpen: false });
    }

    itemList() {
        return this.state.items.map((currentItem) => {
            return (
                <Grid item xs>
                    <ItemCard
                        item={currentItem}
                        editClick={(x) => this.editItem(x) }
                        deleteClick={(x) => this.deleteItem(x)}
                        key={currentItem._id}
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
            >
                <Grid container
                    direction="row"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {this.itemList()}
                </Grid>
                <EditDialog 
                    isOpen={this.state.editIsOpen}
                    handleCloseDialog={() => this.closeEdit(true)}
                    item={this.state.editItem}
                />
                <LoginDialog
                    isOpen={this.state.loginIsOpen}
                    handleCloseDialog={() => this.closeLogin(true)}
                />
            </Box>
        );
    }
}