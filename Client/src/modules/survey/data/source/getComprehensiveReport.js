import axios from 'axios';

export const getComprehensiveReport = async (userId) => {
    const BASE_URL = `http://localhost:3000/survey`;

    try {
        const response = await axios.post(`${BASE_URL}/${userId}/completeResult`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics overview', error.message);
        throw new Error('Failed to fetch analytics overview');
    }
};
