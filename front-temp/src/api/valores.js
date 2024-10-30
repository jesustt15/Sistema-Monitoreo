import axios from "axios";

export const getValoresRequest = () => axios.get('http://localhost:3000/sensor/valores/all');
export const getValoresByPaginationRequest = (page, search) => axios.get('http://localhost:3000/sensor/valores', { params: { page, limit: 5, search } });