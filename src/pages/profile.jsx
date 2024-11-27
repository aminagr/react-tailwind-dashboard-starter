import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaEdit, FaKey, FaSpinner } from 'react-icons/fa';
import { fetchUserData } from '../api/auth';
import EditInfoModal from '../components/profile/EditInfoModal';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const loadUserData = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const data = await fetchUserData(token);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-blue-500 animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
 
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8 px-6 text-center">
          <h1 className="text-3xl font-bold">Bienvenue, {userData.name}</h1>
          <p className="text-sm mt-2">{userData.email}</p>
        </div>

       
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-6">
              <FaUserAlt className="text-5xl text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>

       
          <div className="flex flex-col space-y-4 justify-center">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center justify-center w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              <FaEdit className="mr-2" />
              Modifier les informations
            </button>
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="flex items-center justify-center w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              <FaKey className="mr-2" />
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && (
        <EditInfoModal
          userData={userData}
          onClose={() => setEditModalOpen(false)}
          onSave={async (updatedData) => {
            setUserData(updatedData);
            await loadUserData();  
            setEditModalOpen(false);
          }}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
    </div>
  );
};


export default Profile;
