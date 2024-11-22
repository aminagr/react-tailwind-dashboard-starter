import React, { useState } from 'react';
import SearchBar from '../components/table/SearchBar';
import SortOptions from '../components/table/SortOptions';
import ProductTable from '../components/table/ProductTable';
import Pagination from '../components/table/Pagination';
import EditModal from '../components/table/EditModal';
import AddModal from '../components/table/AddModal';
import { FaPlus } from 'react-icons/fa';

const Table = () => {
  const initialData = [
    { id: 1, productName: 'Apple MacBook Pro 17"', color: 'Argent', category: 'Ordinateur portable', price: '2999$', date: '2023-05-01' },
    { id: 2, productName: 'Microsoft Surface Pro', color: 'Blanc', category: 'PC portable', price: '1999$', date: '2023-06-15' },
    { id: 3, productName: 'Magic Mouse 2', color: 'Noir', category: 'Accessoires', price: '99$', date: '2023-07-20' },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    color: '',
    category: '',
    price: '',
  });

  const rowsPerPage = 10;
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'nouveau') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === 'ancien') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === 'alphabetique') {
      return a.productName.localeCompare(b.productName);
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SortOptions value={sortOrder} onChange={setSortOrder} />
        </div>
        <button
  onClick={() => setIsAddModalOpen(true)}
  className="p-2 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-700 flex items-center justify-center mt-2 md:mt-0 w-full md:w-auto"
>
  <FaPlus className="inline mr-2" />
  Ajouter un produit
</button>

      </div>

      <ProductTable data={currentRows} onEdit={setEditData} onDelete={handleDelete} setIsEditModalOpen={setIsEditModalOpen} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isEditModalOpen && (
        <EditModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedItem) => {
            setData(data.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isAddModalOpen && (
        <AddModal
          data={newProduct}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newItem) => {
            setData([...data, { ...newItem, id: data.length + 1, date: new Date().toISOString().split('T')[0] }]);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Table;
