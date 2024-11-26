import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt, FaChartBar, FaTable } from 'react-icons/fa';
import { logoutUser } from '../../api/auth'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true); 
  };

  const handleCancel = () => {
    setShowConfirmation(false); 
  };

  const handleConfirmLogout = async () => {
    try {
      const data = await logoutUser();
      console.log(data.message || "Déconnexion réussie.");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("isLoggedIn"); 
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      alert("Une erreur est survenue lors de la déconnexion.");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 md:bg-transparent transition-all z-10"
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={`h-screen w-64 bg-gray-800 text-white p-4 transition-transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative absolute top-0 left-0 z-20 md:block`}
      >
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-2xl font-semibold">MyDashboard</h1>
        </div>

        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-all">
              <FaTachometerAlt className="mr-3" />
              <span className="text-lg">Accueil</span>
            </Link>
          </li>
          <li>
            <Link to="/table" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-all">
              <FaTable className="mr-3" /> 
              <span className="text-lg">Table</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-all">
              <FaUser className="mr-3" />
              <span className="text-lg">Profil</span>
            </Link>
          </li>
          <li>
            <Link to="/statistics" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-all">
              <FaChartBar className="mr-3" />
              <span className="text-lg">Statistiques</span>
            </Link>
          </li>
     
        </ul>

        <div className="my-8 border-t border-gray-600"></div>

        <ul>
          <li>
            <button
              onClick={handleLogoutClick}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              <FaSignOutAlt className="mr-3" />
              <span className="text-lg">Se déconnecter</span>
            </button>
          </li>
        </ul>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl mb-4">Êtes-vous sûr de vouloir vous déconnecter ?</h3>
            <button
              onClick={handleConfirmLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
            >
              Oui
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Non
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
