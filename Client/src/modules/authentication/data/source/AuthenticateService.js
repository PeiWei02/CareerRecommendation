import axios from 'axios';

export const isAuthenticate = async () => {
    try {
        await axios.post('http://localhost:3000/auth/checkAuth');
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
