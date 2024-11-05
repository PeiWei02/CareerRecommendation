import axios from 'axios';

export const deleteUser = async (userId) => {
    const BASE_URL = `http://localhost:3000/userManagement`;

    try {
        const response = await axios.delete(`${BASE_URL}/deleteUser`, {
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
