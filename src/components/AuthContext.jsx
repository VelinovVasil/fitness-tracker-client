import React, { createContext, useContext, useState, useEffect } from 'react';
import authenticationService from '../services/authenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = authenticationService.getToken();
    if (token) {
      const userDetails = authenticationService.parseToken(token);
      setUser(userDetails);
    }
  }, []);

  const login = async (username, password) => {
    await authenticationService.login(username, password);
    const token = authenticationService.getToken();
    const userDetails = authenticationService.parseToken(token);
    setUser(userDetails);
  };

  const logout = () => {
    authenticationService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
