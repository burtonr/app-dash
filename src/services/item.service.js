import axios from 'axios';
import authHeader from './auth-header';

const API_ENDPOINT = '/api/dash';

class ItemService {
    getAllItems() {
        return axios.get(API_ENDPOINT, { headers: authHeader() });
    }

    refreshItems() {
        return axios.get(API_ENDPOINT, { headers: { ['Cache-Control']: 'no-cache', ...authHeader() } })
    }

    addItem(item) {
        return axios
            .post(API_ENDPOINT, item, { headers: authHeader() });
    }

    updateItem(itemId, item) {
        return axios
            .put(API_ENDPOINT + `/${itemId}`, item, { headers: authHeader() });
    }

    deleteItem(itemId) {
        return axios
            .delete(API_ENDPOINT + `/${itemId}`, { headers: authHeader() });
    }
}

export default new ItemService();
