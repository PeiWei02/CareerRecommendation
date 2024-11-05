import axios from 'axios';

export const getAllUserService = async () => {
    try {
        const response = await axios.get('http://localhost:3000/auth/', {
            withCredentials: true,
        });
        return response.data.allusers;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
