import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = ''; // get from MMKV storage
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
