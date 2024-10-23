import axios from "axios";

export const getValoresRequest = (page) => axios.get('http://localhost:3000/sensor/valores', { params: { page, limit: 5 } });
