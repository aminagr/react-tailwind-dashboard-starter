import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, productId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-700">Confirmer la suppression</h3>
        <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir supprimer le produit ?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={() => onDelete(productId)} // Passe l'ID pour la suppression
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
