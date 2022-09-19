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

  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <form method='POST' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' name='username' onChange={handleChange} />
        <input type='password' placeholder='Password' name='password' onChange={handleChange}/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default Login