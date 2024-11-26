import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: 'Amina',
    email: 'amina@example.com',
    phone: '+213 234 567 890',
    address: '1234 Rue Principale, Ville, Pays',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || userData;
    setUserData(storedData);
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
 
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <FaUserAlt className="text-4xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{userData.username}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Informations personnelles</h3>
            <div className="flex items-center mb-4">
              <FaUserAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.username}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.email}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.phone}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkedAlt className="text-indigo-500 mr-3" />
              <span className="text-gray-700">{userData.address}</span>
            </div>
          </div>

          {/* Section Changer le Mot de Passe */}
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
