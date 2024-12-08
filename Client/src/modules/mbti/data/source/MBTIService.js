import axios from 'axios';

export const MBTIService = async (answers, userId) => {
    const BASE_URL = `http://localhost:3000/survey`;

    try {
        const response = await axios.post(`${BASE_URL}/${userId}/mbtiResult`, answers, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
