import axios from 'axios';

export const updateJob = async (jobId, jobData, file) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/${jobId}/updateJob`;

    try {
        const formData = new FormData();

        Object.keys(jobData).forEach((key) => {
            formData.append(key, jobData[key]);
        });

        if (file) {
            formData.append('image', file);
        }
        const response = await axios.put(URL, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to update job:', error);
        throw new Error('Failed to update job. Please try again later.');
    }
};
