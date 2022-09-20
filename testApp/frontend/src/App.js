import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components';

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' exact element= {< />} /> */}
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
