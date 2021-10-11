import axios from 'axios';
import config from '../config/default.json';

const API_URL = `${config.server.URI}`

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
