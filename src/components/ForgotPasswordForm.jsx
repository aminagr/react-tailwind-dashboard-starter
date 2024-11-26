import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { sendPasswordResetLink } from "../api/auth"; 
import '../css/login.css';

const ForgotPasswordForm = () => {
  const [maildefault, setMaildefault] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); 
    setMessage(""); 
    setLoading(true);

    try {
      const data = await sendPasswordResetLink(maildefault); 
      setLoading(false); 
      if (data.message) {
        setMessage(data.message); 
      } else {
        setError(data.message || "Erreur d'envoi du lien de réinitialisation.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur de réinitialisation du mot de passe :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-center">
          Mot de passe oublié ?
        </h1>
        <form className="space-y-6" onSubmit={handleForgotPassword}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={maildefault}
              onChange={(e) => setMaildefault(e.target.value)}
              className="maildefault peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Entrez votre email"
            />
            <FaEnvelope className="absolute right-2 top-3 text-gray-500" />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

        
          {loading && (
            <div className="flex justify-center">
              <div className="spinner-border animate-spin border-4 border-t-4 border-indigo-600 w-8 h-8 rounded-full"></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-lg font-medium uppercase rounded-full hover:bg-indigo-700 transition duration-300"
            disabled={loading} 
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-full py-2 mt-4 bg-gray-600 text-white text-lg font-medium rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
