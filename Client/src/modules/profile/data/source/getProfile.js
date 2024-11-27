import axios from 'axios';

export const getProfile = async (userId) => {
    const BASE_URL = `http://localhost:3000/profile`;
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
