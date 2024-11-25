import { useState } from 'react';

const EditModal = ({ data, onClose, onSave }) => {
  const [productName, setProductName] = useState(data.productName);
  const [color, setColor] = useState(data.color);
  const [category, setCategory] = useState(data.category);
  const [price, setPrice] = useState(data.price);
  const [error, setError] = useState('');

  const validateFields = () => {
    if (!productName || !color || !category || !price) {
      return 'Tous les champs doivent être remplis.';
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      return 'Le prix doit être un nombre valide et supérieur à zéro.';
    }
    return ''; 
  };

  const handleSave = () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedItem = { ...data, productName, color, category, price };
    onSave(updatedItem);
    setError('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Modifier le produit</h2>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="productName">
            Nom du produit
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="color">
            Couleur
          </label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">
            Catégorie
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="price">
            Prix
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Annuler
          </button>
          
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
