import React, { useState } from 'react';
import { updateUserInfo } from '../../api/auth'; 

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
        if (!token) throw new Error('Token missing');
        
        const updatedData = { name, email };
        
        const response = await updateUserInfo(updatedData, token);
        
        onSave(response); 
        onClose();
      } catch (err) {
        setError('Failed to update information.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">Modifier les informations</h3>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg" disabled={loading}>Annuler</button>
            <button onClick={handleSave} className="bg-indigo-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default EditInfoModal;
