import axios from "axios";

export const getAllJob = async () => {
  try {
    const response = await axios.get("http://localhost:3000/job/", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
