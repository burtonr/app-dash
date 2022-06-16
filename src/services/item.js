import axios from 'axios';

const getAllItems = () => {
    return axios.get('/api/dash/');
}

const logAccess = (logData) => {
    return axios.post(API_URL, logData);
}

const itemFunctions = {
    getAllItems,
    logAccess
}

export default itemFunctions;
