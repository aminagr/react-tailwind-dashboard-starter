import React, { useState } from 'react'; 
import { updateUserInfo } from '../../api/auth'; 
import { FaUserAlt, FaEnvelope, FaSave, FaTimes } from 'react-icons/fa'; 

const EditInfoModal = ({ userData, onClose, onSave }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Token manquant');
      
      const updatedData = { name, email };
      
      const response = await updateUserInfo(updatedData, token);
      
      onSave(response); 
      onClose();
    } catch (err) {
      setError('Échec de la mise à jour des informations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Modifier les informations</h3>
          <button onClick={onClose} className="text-gray-500 text-2xl hover:text-red-500 transition-colors">
            <FaTimes />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
            <FaUserAlt className="text-gray-500 mr-2" /> Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" /> Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={onClose} 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors" 
            disabled={loading}
          >
            <FaTimes className="inline-block mr-2" /> Annuler
          </button>
          <button 
            onClick={handleSave} 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors" 
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : <>
              <FaSave className="inline-block mr-2" /> Sauvegarder
            </>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoModal;
