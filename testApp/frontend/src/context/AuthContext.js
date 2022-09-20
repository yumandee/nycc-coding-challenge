import React, { createContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => 
    localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken'))
      : null
  );

  const [loading, setLoading] = useState(true);

  /**
   * Logs in the user via the API and establishes user token in local storage
   * @param {string} username 
   * @param {string} password 
   */
  const loginUser = async (username, password, callback) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuthToken(data.token);
        localStorage.setItem('authToken', JSON.stringify(data.token));
      } 
      callback(response.status);
    } catch (error) {
      console.log(error)
    }
  };

  /**
   * Logs out the user by removing token from userStorage
   */
  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    redirect('/');
  }

  const contextData = {
    authToken,
    setAuthToken,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    setLoading(false);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );

};