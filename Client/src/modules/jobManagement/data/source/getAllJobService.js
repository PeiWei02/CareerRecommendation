import axios from 'axios';

export const getAllJobService = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/`;

    try {
        const response = await axios.get(URL, {
            withCredentials: true,
        });
        return response.data;
    } catch {
        throw new Error('Failed to fetch all jobs. Please try again later.');
    }
};
