export default function authHeader() {
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (admin && admin.accessToken) {
        return { 'X-Access-Token': admin.accessToken };
    } else {
        return {};
    }
}