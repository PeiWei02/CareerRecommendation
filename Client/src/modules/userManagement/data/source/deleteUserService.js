import axios from 'axios';

export const deleteUser = async (userId) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/userManagement/deleteUser`;

    try {
        const response = await axios.delete(URL, {
            params: {
                id: userId,
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
};
