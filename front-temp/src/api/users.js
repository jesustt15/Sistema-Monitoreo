import axios from "axios";

export const getUsersRequest = () => axios.get('http://localhost:3000/sensor/users');
export const createUsersRequest = (user) => axios.post('http://localhost:3000/sensor/users', user);
export const updateUsersRequest = (id, user)  => axios.put(`http://localhost:3000/sensor/users/${id}`, user);
export const deleteUsersRequest = (id) => axios.delete(`http://localhost:3000/sensor/users/${id}`);
export const getOneUsersRequest = (id) => axios.get(`http://localhost:3000/sensor/users/${id}`);