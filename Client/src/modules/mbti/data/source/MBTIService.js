import axios from 'axios';

export const MBTIService = async (answers, userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/survey/${userId}/mbtiResult`;

    try {
        const response = await axios.post(URL, answers, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
