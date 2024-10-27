import { useLoggedUserId } from "@/modules/authentication/domain/useCase/useLoggedUserID";
import axios from "axios";

export const Holland6Service = async (Json) => {
  const userId = useLoggedUserId()

  try {
    const response = await axios.post(
      `http://localhost:3000/survey/${userId}/holland6Result`,
      Json,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
