import axios from "axios";

export const getLugarRequest = () => axios.get('http://localhost:3000/sensor/lugares');
export const createLugarRequest = (lugar) => axios.post('http://localhost:3000/sensor/lugares', lugar);
export const updateLugarRequest = (lugar) => axios.put(`/lugares/${lugar._id}`, lugar);
export const deleteLugarRequest = (id) => axios.get(`/lugares/${id}`);