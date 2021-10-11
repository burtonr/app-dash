import axios from 'axios';
import authHeader from './authHeader';
import config from '../config/default.json';

const API_URL = `${config.server.URI}/admin`
// axios.create({baseUrl: API_URL}) wasn't working as expected
const authConfig = {
    headers: authHeader()
};

const changePassword = (password) => {
    return axios
        .post(API_URL + '/password', { newPassword: password }, authConfig);
}

const addItem = (item) => {
    return axios
        .post(API_URL, item, authConfig);
}

const updateItem = (itemId, item) => {
    return axios
        .put(API_URL + `/${itemId}`, item, authConfig);
}

const deleteItem = (itemId) => {
    return axios
        .delete(API_URL + `/${itemId}`, authConfig);
}

const adminFunctions = {
    changePassword,
    addItem,
    updateItem,
    deleteItem
}

export default adminFunctions;
    