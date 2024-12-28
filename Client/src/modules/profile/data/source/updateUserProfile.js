import axios from 'axios';

export const updateUserProfile = async (userId, payload) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const URL = `${BASE_URL}/profile/${userId}/updateProfile`;

    try {
        await axios.put(URL, payload, {
            withCredentials: true,
        });
        return true;
    } catch {
        throw new Error('Failed to update profile');
    }
};
