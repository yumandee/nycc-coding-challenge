import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

const RequireAuth = ({ children }) => {
  let { authToken } = useContext(AuthContext);
  let location = useLocation();

  if (!authToken) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;