import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa'; 


const ProductTable = ({ data, onEdit, onDelete, setIsEditModalOpen }) => {
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
   
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="text-blue-500 animate-spin text-4xl" /> 
      </div>
    );
  }

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="text-left text-sm font-medium text-gray-700">
          <th className="px-4 py-2 border-b border-r border-t">ID</th>
          <th className="px-4 py-2 border-b border-r border-t">Nom du produit</th>
          <th className="px-4 py-2 border-b border-r border-t">Couleur</th>
          <th className="px-4 py-2 border-b border-r border-t">Catégorie</th>
          <th className="px-4 py-2 border-b border-r border-t">Prix</th>
          <th className="px-4 py-2 border-b border-t">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2 border-r">{item.id}</td>
            <td className="px-4 py-2 border-r">{item.productName}</td>
            <td className="px-4 py-2 border-r">{item.color}</td>
            <td className="px-4 py-2 border-r">{item.category}</td>
            <td className="px-4 py-2 border-r">{item.price}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => {
                  onEdit(item); 
                  setIsEditModalOpen(true); 
                }}
                className="p-2 text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
