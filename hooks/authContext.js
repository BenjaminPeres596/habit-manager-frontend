import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
  };

  const clearToken = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
