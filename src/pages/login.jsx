// src/pages/login.jsx
import React from "react";
import LoginForm from "../components/LoginForm";
import loginImage from "../assets/images/login.jpg";

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full md:w-[900px] h-auto md:h-[600px] flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center p-6">
          <LoginForm />
        </div>
        <div className="w-full md:w-1/2 bg-white text-indigo-600 flex flex-col justify-center items-center p-6 md:p-8">
          <div className="w-full hidden md:block">
            <img src={loginImage} alt="Login" />
          </div>
          <div className="flex flex-col justify-between h-full mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Pas encore inscrit ?
            </h2>
            <p className="mb-6 text-center text-sm md:text-base">
              Créez un compte pour accéder à toutes nos fonctionnalités.
            </p>
            <a
              href="/signup"
              className="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 text-center"
            >
              Inscrivez-vous !
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



