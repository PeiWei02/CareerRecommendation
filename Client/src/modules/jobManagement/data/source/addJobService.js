import axios from 'axios';

export const addJob = async (jobData, file) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/job/addJob`;

    try {
        const formData = new FormData();

        Object.keys(jobData).forEach((key) => {
            formData.append(key, jobData[key]);
        });

        if (file) {
            formData.append('image', file);
        }

        const response = await axios.post(URL, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to add job:', error);
        throw new Error('Failed to add job. Please try again later.');
    }
};
