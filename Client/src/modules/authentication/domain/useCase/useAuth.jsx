import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticate } from "../../data/source/AuthenticateService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userID, setUserID] = useState(() => {
    return localStorage.getItem("userID") || null;
  });

  //TODO Create a direct instaed of using useEffect
  useEffect(() => {
    if (userID) {
      setIsAuthenticated(true);
      localStorage.setItem("userID", userID);
    }
  }, [userID, setUserID]);

  const checkLogin = async () => {
    const isValidSession = await isAuthenticate();

    if (isValidSession) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userID");
      setUserID(null);
      setIsAuthenticated(false);
    }
  };

  checkLogin();

  const signOut1 = () => {
    setUserID(null);
    localStorage.removeItem("userID");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userID, setUserID, signOut1 }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
