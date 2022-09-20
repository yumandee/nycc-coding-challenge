import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  const [errors, setErrors] = useState(false);

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(values.username, values.password);
    console.log(success)
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='login-form__div'>
      <form className='login-form__form' method='POST' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={values.username}
          name='username'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          value={values.password}
          name='password'
          onChange={handleChange}
        />
        { errors && <div> You have entered invalid credentials. </div>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;