import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import axios from 'axios';
import { useContext } from 'react';

export const Holland6Service = async (Json) => {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    try {
        const response = await axios.post(`http://localhost:3000/survey/${userId}/holland6Result`, Json, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
