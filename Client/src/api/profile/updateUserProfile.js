import axios from "axios";

export const updateUserProfile = async (Userid, Json) => {
  const id = Userid;
  console.log(Userid);
  console.log(Json);
  try {
    const response = await axios.put(
      `http://localhost:3000/profile/${id}/updateProfile`,
      Json,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
