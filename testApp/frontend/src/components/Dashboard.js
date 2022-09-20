import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && <h1>Hello, {user}</h1>}
      <h1> Homepage!! </h1>
    </div>
  );
};

export default Dashboard;