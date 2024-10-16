import axios from "axios";

export const Holland6Service = async (Json) => {
  const id = "66530595dc9749f53177b1f5";

  try {
    const response = await axios.post(
      `http://localhost:3000/survey/${id}/holland6Result`,
      Json,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
