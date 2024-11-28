import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import axios from 'axios';
import { useContext } from 'react';

export const theVarkResultService = async (answers) => {
    const BASE_URL = `http://localhost:3000/survey`;
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    try {
        const response = await axios.post(`${BASE_URL}/${userId}/theVarkResult`, answers, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
