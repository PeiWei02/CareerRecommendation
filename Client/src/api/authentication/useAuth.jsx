// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkAuthStatus } from "./token.js";
// import { useContext, createContext } from "react";

// // const useAuth = () => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(() => {
// //     const authStatus = await checkAuthStatus();
// //     setIsAuthenticated(authStatus);
// //     return isAuthenticated
// //   });
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const verifyAuth = async () => {
// //       console.log("first UseAuth");
// //       const authStatus = await checkAuthStatus();
// //       setIsAuthenticated(authStatus);

// //       if (!authStatus) {
// //         console.log("At UseAuth");
// //         navigate("/login");
// //       }
// //     };

// //     verifyAuth();
// //   }, [navigate]);

// //   return isAuthenticated;
// // };

// // export default useAuth;
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     // Synchronous check during initialization
//     return checkAuthStatus();
//   });

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
