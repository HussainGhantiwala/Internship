import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api',
});

// User APIs
export const getUsers = () => API.get('/users');
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const getUserById = (id) => API.get(`/users/${id}`);

export default API;
