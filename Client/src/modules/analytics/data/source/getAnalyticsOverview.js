import axios from 'axios';

export const getAnalyticsOverview = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/analytics/getAnalyticsOverview`;

    try {
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics overview', error.message);
        throw new Error('Failed to fetch analytics overview');
    }
};
