import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login, Dashboard, RequireAuth } from './components';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth><Dashboard /></RequireAuth>} exact path='/' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);


export default App;