import axios from 'axios';

export const checkAdminRole = async (userId) => {
    if (!userId) {
        return false;
    }

    try {
        const response = await axios.post('http://localhost:3000/admin/checkAdminRole', { userId });

        return response.data.isAdmin;
    } catch (error) {
        throw new Error(`Failed to check admin role: ${error.response ? error.response.data : error.message}`);
    }
};
