import axios from 'axios';

export const getComprehensiveReport = async (userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/survey/${userId}/completeResult`;

    try {
        const response = await axios.post(URL, {}, { withCredentials: true });
        return response.data;
    } catch {
        throw new Error('Failed to fetch analytics overview');
    }
};
