import axios from 'axios';

export const getSurveyCompleted = async (userId) => {
    const BASE_URL = `http://localhost:3000/survey`;

    try {
        const response = await axios.post(`${BASE_URL}/${userId}/checkSurveyCompleted`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching completed survey', error.message);
        throw new Error('Failed to fetch analytics overview');
    }
};
