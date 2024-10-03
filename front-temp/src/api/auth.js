import axios from "axios";

export const loginRequest = async (user) => axios.post(`http://localhost:3000/sensor/auth/`, user);

// export const verifyTokenRequest = async () => axios.get(`http://localhost:3000/sensor/auth/verify`);