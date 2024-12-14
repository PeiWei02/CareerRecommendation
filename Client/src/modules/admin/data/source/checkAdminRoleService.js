import axios from 'axios';

export const checkAdminRoleService = async (userId) => {
    if (!userId) {
        return false;
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/admin/checkAdminRole`;

    try {
        const response = await axios.post(URL, { userId });
        const { admin } = response;
        return { isAdmin: true, admin: admin };
    } catch (error) {
        console.error('Error checking admin', error);
        return { isAdmin: false, admin: null };
    }
};
