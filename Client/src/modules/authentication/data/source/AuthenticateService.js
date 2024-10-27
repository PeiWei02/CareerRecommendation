import axios from "axios";

export const isAuthenticate = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/checkAuth",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
      console.error("Error:",  error)
    return false;
  }
};
