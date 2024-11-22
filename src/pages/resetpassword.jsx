// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();  
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

      const response = await fetch("http://ton-backend-laravel/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
      } else {
        setError(data.message || "Erreur de réinitialisation du mot de passe.");
      }
    } catch (error) {
      console.error("Erreur de réinitialisation du mot de passe :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-3/4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Réinitialiser votre mot de passe</h1>
      <form className="space-y-6" onSubmit={handleResetPassword}>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white focus:outline-none focus:border-white"
            placeholder="Nouveau mot de passe"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white focus:outline-none focus:border-white"
            placeholder="Confirmer le mot de passe"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200">
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
