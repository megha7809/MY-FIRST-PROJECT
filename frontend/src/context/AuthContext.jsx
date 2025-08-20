import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('authToken');
  });

  const [isManager, setIsManager] = useState(() => {
    return localStorage.getItem('userType') === 'manager';
  });

  const login = (token, managerStatus = false) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', managerStatus ? 'manager' : 'customer');
    setIsLoggedIn(true);
    setIsManager(managerStatus);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setIsManager(false);
  };

  // Check auth status whenever the component mounts or updates
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isManager, login, logout }}>
      {children}
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
