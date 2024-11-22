// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/login';
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
       
        <Route path="/" element={<LoginPage />} />
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

export default App;
