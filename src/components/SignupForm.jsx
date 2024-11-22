import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import '../css/login.css';
const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Utilisateur inscrit avec succès!");
    
        navigate('/'); 
      } else {
   
        if (data.message.includes('email')) {
          setError("L'email est déjà utilisé.");
        } else {
          setError(data.message || "Erreur d'inscription");
        }
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  

  return (
    <div className="w-full md:w-3/4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
        Créer un compte
      </h1>
      <form className="auth-form space-y-4 md:space-y-6" onSubmit={handleSignup}>
        <div className="relative">
          <FaUser className="absolute left-2 top-3 text-white" />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Nom"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-white" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Mot de passe"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Confirmer le mot de passe"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200">
          Inscription
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
