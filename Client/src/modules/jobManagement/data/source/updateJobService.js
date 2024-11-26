import axios from 'axios';

const API_URL = 'http://localhost:3000/job';

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await axios.put(`${API_URL}/${jobId}/updateJob`, jobData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};
