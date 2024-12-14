import axios from 'axios';

export const updateUserPassword = async (Userid, Json) => {
    const id = Userid;

    try {
        const response = await axios.put(`http://localhost:3000/profile/${id}/updatePassword`, Json, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
