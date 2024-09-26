import axios from "axios";

export const loginRequest = async ({email , password}) => axios.post(`http://localhost:3000/sensor/auth/`, {email, password});

export const checkAuthTokenRequest = async () => axios.get(`http://localhost:3000/sensor/auth/renew`);