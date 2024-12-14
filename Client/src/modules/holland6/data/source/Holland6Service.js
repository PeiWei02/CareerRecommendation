import axios from 'axios';

export const Holland6Service = async (payload, userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/survey/${userId}/holland6Result`;

    try {
        const response = await axios.post(URL, payload, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
