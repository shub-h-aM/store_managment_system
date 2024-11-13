import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/customers/login`, credentials);
    return response.data;
};

export const createOrder = async (orderData, token) => {
    const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: token },
    });
    return response.data;
};
