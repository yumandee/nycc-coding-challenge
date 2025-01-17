import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(false);
    const formData = new FormData(e.currentTarget);
    loginUser(formData.get('username'), formData.get('password'), (status) => {
      if (status === 200) {
        navigate('/', { replace: true }); //go back to previous page and replace in stack so going back doesn't bring back to login
      } else {
        setErrors(true);
      }

    });
    
  };

  return (
    <div className='login-form__div'>
      <form className='login-form__form' method='POST' onSubmit={handleSubmit}> 
        <input
          type='text'
          placeholder='Username'
          name='username'
          autoFocus
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
        />
        { errors ? <div className='login-form__errors'> Invalid credentials. </div> : <div></div>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;