import axios from 'axios';
import config from '../config';

export const RequestClient = axios.create({
  baseURL: config.PUBLIC_SERVER_URL
});

RequestClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
