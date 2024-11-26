import axios from 'axios';

const API_URL = 'http://localhost:3000/job/addJob';

export const addJob = async (jobData) => {
    try {
        const response = await axios.post(API_URL, jobData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error adding job:', error);
        throw error;
    }
};
