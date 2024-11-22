import { useState } from 'react';

const AddModal = ({ data, onClose, onSave }) => {
  const [productName, setProductName] = useState(data.productName);
  const [color, setColor] = useState(data.color);
  const [category, setCategory] = useState(data.category);
  const [price, setPrice] = useState(data.price);

  const handleSave = () => {
    const newItem = { id: Date.now(), productName, color, category, price, date: new Date().toISOString().split('T')[0] };
    onSave(newItem);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Ajouter un produit</h2>
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
  className="px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-700"
>
  Ajouter
</button>

        </div>
      </div>
    </div>
  );
};

export default AddModal;
