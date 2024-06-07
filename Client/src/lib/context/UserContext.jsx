import { Children, createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ Children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails }}
    ></UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
