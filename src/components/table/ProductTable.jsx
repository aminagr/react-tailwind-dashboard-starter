import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = ({ data, onEdit, onDelete, setIsEditModalOpen }) => (
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="text-left text-sm font-medium text-gray-700">
        <th className="px-4 py-2 border-b">ID</th>
        <th className="px-4 py-2 border-b">Nom du produit</th>
        <th className="px-4 py-2 border-b">Couleur</th>
        <th className="px-4 py-2 border-b">Catégorie</th>
        <th className="px-4 py-2 border-b">Prix</th>
        <th className="px-4 py-2 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2">{item.id}</td>
          <td className="px-4 py-2">{item.productName}</td>
          <td className="px-4 py-2">{item.color}</td>
          <td className="px-4 py-2">{item.category}</td>
          <td className="px-4 py-2">{item.price}</td>
          <td className="px-4 py-2">
            <button
              onClick={() => {
                onEdit(item); // Appel de la fonction onEdit avec l'élément actuel
                setIsEditModalOpen(true); // Ouvrir le modal d'édition
              }}
              className="p-2 text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(item.id)} // Appel de la fonction onDelete avec l'ID de l'élément
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

export default ProductTable;
