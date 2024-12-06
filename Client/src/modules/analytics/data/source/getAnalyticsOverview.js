import axios from 'axios';

export const getAnalyticsOverview = async () => {
    const BASE_URL = `http://localhost:3000/analytics`;

    try {
        const response = await axios.get(`${BASE_URL}/getAnalyticsOverview`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics overview', error.message);
        throw new Error('Failed to fetch analytics overview');
    }
};
