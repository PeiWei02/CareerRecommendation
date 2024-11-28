import axios from 'axios';

export const checkAdminRoleService = async (userId) => {
    if (!userId) {
        return false;
    }

    try {
        const response = await axios.post('http://localhost:3000/admin/checkAdminRole', { userId });
        console.log('response', response);
        const { admin } = response;
        return { isAdmin: true, admin: admin };
    } catch (error) {
        console.error('Error checking admin', error);
        return { isAdmin: false, admin: null };
    }
};
