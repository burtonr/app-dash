import axios from 'axios';

class AuthService {
    initComplete = false
    authDisabled = false

    async init() {
        try {
            const res = await axios.get('api/dash/auth/init')
            const { data: { authDisabled } } = res
            this.authDisabled = authDisabled
        } catch (err) {
            this.authDisabled = false
        } finally {
            this.initComplete = true
        }
    }
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

    async getCurrentUser() {
        if (!this.initComplete) {
            await this.init()
        }

        // No auth, return fake admin user
        if (this.authDisabled) {
            return { role: 'admin' }
        }

        const userData = localStorage.getItem('app-dash-user');
        if (userData)
            return JSON.parse(userData)
    }
}

export default new AuthService();
