import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "./token.js"; 

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);

      if (!authStatus) {
        navigate("/login");
      }
    };

    verifyAuth();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
