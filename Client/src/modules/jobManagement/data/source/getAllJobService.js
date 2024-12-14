import axios from 'axios';

export const getAllJobService = async () => {
    try {
        const response = await axios.get('http://localhost:3000/job/', {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
