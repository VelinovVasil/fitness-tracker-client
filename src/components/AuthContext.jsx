import React, { createContext, useContext, useState, useEffect } from 'react';
import authenticationService from '../services/authenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authenticationService.getToken();
    if (token) {
      const userDetails = authenticationService.parseToken(token);
      setUser(userDetails);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    await authenticationService.login(username, password);
    const token = authenticationService.getToken();
    const userDetails = authenticationService.parseToken(token);
    setUser(userDetails);

    console.log("User details:");
    console.log(userDetails);

    window.location.reload();
  };

  const logout = () => {
    authenticationService.logout();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

