import { useLoggedUserId } from '@/modules/authentication/domain/useCase/useLoggedUserID';
import axios from 'axios';

export const theVarkResultService = async (answers) => {
    const BASE_URL = `http://localhost:3000/survey`;
    const userId = useLoggedUserId();

    try {
        const response = await axios.post(`${BASE_URL}/${userId}/theVarkResult`, answers, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
