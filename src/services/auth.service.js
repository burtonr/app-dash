import axios from 'axios';

class AuthService {
    async login(username, password) {
        const res = await axios
            .post('api/dash/auth/signin', { username, password });
        if (res.data.accessToken) {
            localStorage.setItem('app-dash-user', JSON.stringify(res.data));
        }
        return res.data;
    };

    logout() {
        localStorage.removeItem('app-dash-user');
    };

    getCurrentUser() {
        const userData = localStorage.getItem('app-dash-user');
        if (userData)
            return JSON.parse(userData)
    }
}

export default new AuthService();
