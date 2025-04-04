import { createContext, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import NotFound from './NotFound.jsx';
import Navbar from './Nav.jsx';
import Add from './Add.jsx';
import Update from './Update.jsx';
import Delete from './Delete.jsx';
import Login from './Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<App />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />


        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
);
