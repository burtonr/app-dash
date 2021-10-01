import axios from 'axios';

const API_URL = 'http://localhost:8080'

const login = (password) => {
    return axios
        .post(API_URL + '/login', { password })
        .then((res) => {
            if (res.data.accessToken) {
                localStorage.setItem('admin', JSON.stringify(res.data));
            }

            return res.data;
        });
};

const logout = () => {
    axios.get(API_URL + '/logout');
    localStorage.removeItem('admin');
};

const isLoggedIn = () => {
    const admin = localStorage.getItem('admin');
    return admin ? true : false;
}

const authFunctions = {
    login,
    logout,
    isLoggedIn
}

export default authFunctions;