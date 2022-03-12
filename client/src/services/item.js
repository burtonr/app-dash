import axios from 'axios';

const API_URL = window.ENV.APP_DASH_API_URL;

const getAllItems = () => {
    return axios.get(API_URL);
}

const logAccess = (logData) => {
    return axios.post(API_URL, logData);
}

const itemFunctions = {
    getAllItems,
    logAccess
}

export default itemFunctions;
