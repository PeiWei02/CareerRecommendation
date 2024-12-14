import axios from 'axios';

export const deleteJob = async (jobId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/${jobId}/deleteJob`;

    try {
        const response = await axios.delete(URL, { withCredentials: true });
        if (response.status >= 200 && response.status < 300) {
            return true;
        } else {
            console.error('Unexpected response status:', response.status, response.data);
            return false;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error deleting job:', error.response.status, error.response.data);
        }
        return false;
    }
};
