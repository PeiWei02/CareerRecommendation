import axios from 'axios';

export const updateUserProfile = async (Userid, Json) => {
    const id = Userid;
    console.log(Userid);
    console.log(Json);
    try {
        await axios.put(`http://localhost:3000/profile/${id}/updateProfile`, Json, {
            withCredentials: true,
        });
        return true;
    } catch {
        return false;
    }
};
