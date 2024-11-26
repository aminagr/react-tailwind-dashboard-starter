import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkedAlt, FaSpinner } from 'react-icons/fa'; 
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-blue-500 animate-spin text-4xl" /> 
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <FaUserAlt className="text-4xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Informations personnelles</h3>
            <div className="flex items-center mb-4">
              <FaUserAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.name}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.email}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.phone || 'Non renseigné'}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkedAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.address || 'Non renseignée'}</span>
            </div>
          </div>

          {/* Section pour changer le mot de passe */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Changer le mot de passe</h3>
            <div className="mb-4">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="current-password"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="new-password"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Entrez votre nouveau mot de passe"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirmez votre nouveau mot de passe"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200">
              Sauvegarder les changements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
