import axios from 'axios';

export const checkAuthService = async () => {
    try {
        const response = await axios.post('http://localhost:3000/auth/checkAuth', {}, { withCredentials: true });
        const { user } = response.data;
        return { authStatus: true, user };
    } catch (error) {
        console.error('Error checking auth status:', error);
        return { authStatus: false, user: null };
    }
};
