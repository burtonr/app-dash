import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${window.ENV.APP_DASH_API_URL}/admin`;
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
    