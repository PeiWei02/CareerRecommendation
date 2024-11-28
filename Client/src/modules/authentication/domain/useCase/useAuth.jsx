import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { checkAuthService } from '../../data/source/checkAuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const logIn = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        if (userData.role === 'admin') {
            setIsAdmin(true);
        }
    };

    const logOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            //Maybe need to return True/False and the user details
            //Set the user details in user, so that role also can get the id / isAdmin from the user
            //so no need to call checkAdmin and the user value here is correct
            const authResponse = await checkAuthService();
            const { authStatus: isAuth, user: userData } = authResponse;
            const { role } = userData;
            if (isAuth) {
                logIn(userData);
                if (role === 'admin') {
                    setIsAdmin(true);
                }
            } else {
                logOut();
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, isAdmin, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
