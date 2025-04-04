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
import { Toaster } from 'react-hot-toast';
import { enqueueSnackbar } from 'notistack';

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
    <footer className="bg-gray-800 text-white text-center py-4">
      Made with <span className="text-red-500">♥</span> by Ishan Khurana | Contact: 9871335748
    </footer>
    <Toaster position="top-right" />
  </Router>
);

// Example usage of enqueueSnackbar for notifications
enqueueSnackbar('Welcome to GymShala!', { variant: 'success' });
