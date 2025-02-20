import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthenticationService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await AuthService.isAuthenticated();
            setIsAuthenticated(authStatus);
            if (authStatus) {
                const userData = await AuthService.getUserData();
                setUserData(userData);
            }
            setIsLoading(false);
        }
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            await AuthService.login(username, password);
            const userData = await AuthService.getUserData();
            setUserData(userData);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUserData(null);
            setIsAuthenticated(false);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ userData, isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;