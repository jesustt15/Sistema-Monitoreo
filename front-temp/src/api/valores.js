import axios from "axios";

export const getValoresRequest = () => axios.get('http://localhost:3000/sensor/valores');
