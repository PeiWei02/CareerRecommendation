import axios from "axios";

export const checkAuthStatus = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/checkAuth",
      {},
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (err) {
    return false;
  }
};
