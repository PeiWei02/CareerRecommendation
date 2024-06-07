import axios from "axios";

export const checkAuthStatus = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/checkAuth",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (err) {
    return false;
  }
};
