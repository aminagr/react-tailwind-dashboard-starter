import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';  
import SignupPage from './pages/signup';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPassword from './pages/resetpassword';
import Dashboard from './pages/dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import Table from "./pages/table";
import Profile from "./pages/profile";
import Stats from "./pages/statistics";

import PrivateRoute from "./components/PrivateRoute";
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectHome />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute layout={DashboardLayout} element={<Dashboard />} />
          }
        />
        <Route
          path="/table"
          element={
            <PrivateRoute layout={DashboardLayout} element={<Table />} />
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute layout={DashboardLayout} element={<Profile />} />
          }
        />


      <Route
          path="/statistics"
          element={
            <PrivateRoute layout={DashboardLayout} element={<Stats />} />
          }
        />
     


      </Routes>
    </Router>
  );
};

const RedirectHome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');  
    }
  }, [navigate]);

  return null;
};

export default App;
