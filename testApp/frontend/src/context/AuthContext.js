import { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => 
    localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken'))
      : null
  );

  const [loading, setLoading] = useState(true);

  const history = useHistory();

  /**
   * Logs in the user via the API and establishes user token in local storage
   * @param {string} username 
   * @param {string} password 
   */
  const loginUser = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/login/', {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      // setUser(data); // For this project, token is the same
      history.push('/');
    } else {
      console.log('Something went wrong. Could not log in the user with these credentials.');
    }
  };

  /**
   * Logs out the user by removing token from userStorage
   */
  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    history.push('/');
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