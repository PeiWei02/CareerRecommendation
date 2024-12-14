import axios from 'axios';

export const addJob = async (jobData) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/addJob`;

    try {
        const response = await axios.post(URL, jobData, { withCredentials: true });
        return response.data;
    } catch {
        throw new Error('Failed to add job. Please try again later.');
    }
};
