import axios from "axios";

export const updateConfigRequest = (config)  => axios.put(`http://localhost:3000/sensor/config`, config);
export const getConfigRequest = () => axios.get(`http://localhost:3000/sensor/config`);