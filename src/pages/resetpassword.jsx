import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { resetPassword } from "../api/auth";
import '../css/login.css';

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const navigate = useNavigate(); 

  const [maildefault, setMaildefault] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const data = await resetPassword({ token, email: maildefault, password, password_confirmation: confirmPassword });
      if (data.message) {
        setMessage(data.message);
      } else {
        setError(data.message || "Erreur de réinitialisation du mot de passe.");
      }
    } catch (error) {
      console.error("Erreur de réinitialisation du mot de passe :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-center">
          Réinitialiser votre mot de passe
        </h1>
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={maildefault}
              onChange={(e) => setMaildefault(e.target.value)}
              className="maildefault peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Votre email"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Confirmer le mot de passe"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-lg font-medium uppercase rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")} 
            className="flex items-center justify-center w-full py-2 mt-4 bg-gray-600 text-white text-lg font-medium rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Retour à la page de connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
