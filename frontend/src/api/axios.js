// src/api/axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
