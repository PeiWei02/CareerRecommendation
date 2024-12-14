import axios from 'axios';

export const getAllUserService = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/auth/getAllUsers`;

    try {
        const response = await axios.get(URL, {
            withCredentials: true,
        });
        return response.data.allusers;
    } catch {
        throw new Error('Failed to fetch all users. Please try again later.');
    }
};
