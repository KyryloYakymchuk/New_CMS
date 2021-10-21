import axios from 'axios';

export const api = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'http://localhost:5000'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('NewCMS_accessToken');
        if (token) {
            config.headers = {
                Authorization: token
            };
        } else {
            window.location.href = '/';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('NewCMS_accessToken');
            if (!window.location.href.includes('login')) {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);
