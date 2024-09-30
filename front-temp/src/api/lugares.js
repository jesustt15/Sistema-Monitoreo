import axios from "axios";

export const getLugarRequest = () => axios.get('http://localhost:3000/sensor/lugares');
export const createLugarRequest = (lugar) => axios.post('http://localhost:3000/sensor/lugares', lugar);
export const updateLugarRequest = (id, lugar)  => axios.put(`http://localhost:3000/sensor/lugares/${id}`, lugar);
export const deleteLugarRequest = (id) => axios.delete(`http://localhost:3000/sensor/lugares/${id}`);
export const getOneLugarRequest = (id) => axios.get(`http://localhost:3000/sensor/lugares/${id}`);
