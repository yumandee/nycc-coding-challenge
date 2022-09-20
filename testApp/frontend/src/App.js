import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import { Login, Dashboard } from './components';

const App = () => (
  <BrowserRouter>
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path='/login' />
          <Route element={<Dashboard />} path='/' />
        </Routes>
      </AuthProvider>
    </div>
  </BrowserRouter>
);

export default App;
