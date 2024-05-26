import axios from 'axios';

const API_URL = 'http://localhost:8000/log/';

const logApi = {
    getLogs: () => {
        return axios.get(API_URL);
    }
};

export default logApi;
