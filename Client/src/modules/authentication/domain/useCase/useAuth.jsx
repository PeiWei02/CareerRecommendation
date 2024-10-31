import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userID, setUserID] = useState(() => {
        return localStorage.getItem('userID') || null;
    });

    //TODO Create a direct instaed of using useEffect
    useEffect(() => {
        if (userID) {
            setIsAuthenticated(true);
            localStorage.setItem('userID', userID);
        }
    }, [userID, setUserID]);

    const logOut = () => {
        setUserID(null);
        localStorage.removeItem('userID');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userID, setUserID, logOut }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
