import axios from 'axios';

export const getSurveyCompleted = async (userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/survey/${userId}/checkSurveyCompleted`;

    try {
        const response = await axios.post(URL, {}, { withCredentials: true });
        return response.data;
    } catch {
        throw new Error('Failed to fetch analytics overview');
    }
};
