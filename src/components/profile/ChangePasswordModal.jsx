import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  
import { changePassword } from '../../api/auth'; 

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [loading, setLoading] = useState(false);

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage(''); 
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Token manquant');

      const data = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,  
      };

      const response = await changePassword(data, token);
      setSuccessMessage('Mot de passe modifié avec succès !');

      setTimeout(() => {
        onClose(); 
      }, 2000); 
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur lors du changement du mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Changer le mot de passe</h3>
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


        <div className="mb-4">
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
          <div className="relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg pr-10" 
              placeholder="Entrez votre mot de passe actuel"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {currentPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>


        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <div className="relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg pr-10"
              placeholder="Entrez votre nouveau mot de passe"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {newPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>


        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmez le nouveau mot de passe</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg pr-10"
              placeholder="Confirmez votre nouveau mot de passe"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {confirmPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg" disabled={loading}>Annuler</button>
          <button onClick={handleSave} className="bg-red-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
