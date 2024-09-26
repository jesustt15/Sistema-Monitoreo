import axios from "axios";

export const getHistoricoRequest = () => axios.get('http://localhost:3000/sensor/historico');