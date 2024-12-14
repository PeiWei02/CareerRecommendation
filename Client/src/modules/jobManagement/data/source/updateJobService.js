import axios from 'axios';

export const updateJob = async (jobId, jobData) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/${jobId}/updateJob`;

    try {
        const response = await axios.put(URL, jobData, { withCredentials: true });
        return response.data;
    } catch {
        throw new Error('Failed to update job. Please try again later.');
    }
};
