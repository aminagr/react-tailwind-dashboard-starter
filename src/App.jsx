import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';  // Assure-toi que ce composant existe
import SignupPage from './pages/signup';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPassword from './pages/resetpassword';
import Dashboard from './pages/dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import Table from "./pages/table";
import PrivateRoute from "./components/PrivateRoute";
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectHome />} />
        <Route path="/login" element={<LoginPage />} /> {/* Ajoute la route /login */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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
      navigate('/login');  // Assure-toi que cette redirection mène bien à la page de login
    }
  }, [navigate]);

  return null;
};

export default App;
