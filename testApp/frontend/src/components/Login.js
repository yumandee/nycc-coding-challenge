import React, { useState } from 'react'


const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div class='login-form__div'>
      <form class='login-form__form' method='POST' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' value={values.username} name='username' onChange={handleChange} />
        <input type='password' placeholder='Password' value={values.password} name='password' onChange={handleChange}/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default Login