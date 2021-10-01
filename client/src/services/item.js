import axios from 'axios';

const API_URL = 'http://localhost:8080/';

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
