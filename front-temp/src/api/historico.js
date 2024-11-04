import axios from "axios";

export const getHistoricoRequest = (page, search) => axios.get('http://localhost:3000/sensor/historico', { params: { page, limit: 10, search } });