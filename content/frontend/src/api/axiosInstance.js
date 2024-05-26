import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Django 后端的 URL
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;
