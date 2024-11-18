import axios from "axios";

export const getHistoricoRequest = (page, search, filter) => {
    const { type, value } = filter;
    return axios.get('http://localhost:3000/sensor/historico', { 
        params: { page, limit: 10, search, filterType: type, filterValue: value } 
    });
};
