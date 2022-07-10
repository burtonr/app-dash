export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('app-dash-user'));

    if (user && user.accessToken) {
        return { 'X-Access-Token': user.accessToken };
    } else {
        return {};
    }
}