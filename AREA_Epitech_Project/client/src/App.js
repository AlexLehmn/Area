import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Service from './Pages/Service';
import Login from './Pages/Login';
import Register from './Components/RegisterSystem';
import Equipe from './Pages/Equipe';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/us" element={<Equipe />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
