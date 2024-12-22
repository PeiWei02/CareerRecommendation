import axios from 'axios';

export const getHolland6Results = async (userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/survey/getHolland6Results/${userId}`;

    try {
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
