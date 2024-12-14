import axios from 'axios';

export const updateUserPassword = async (userId, payload) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/profile/${userId}/updatePassword`;

    try {
        const response = await axios.put(URL, payload, {
            withCredentials: true,
        });
        return response.data;
    } catch {
        throw new Error('Failed to update user password. Please try again later.');
    }
};
