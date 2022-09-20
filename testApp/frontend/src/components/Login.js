import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import LoginForm from './LoginForm'

const Login = () => {
  const { authToken } = useContext(AuthContext);

  if (authToken) {
    return <Navigate to='/' />
  }

  return (
    <LoginForm />
  )
}
export default Login