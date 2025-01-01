import axios from 'axios';

export const getImage = async (imageId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/image/${imageId}`;
    try {
        const response = await axios.get(URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
