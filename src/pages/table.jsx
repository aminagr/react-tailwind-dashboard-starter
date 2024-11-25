import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/index';  
import SearchBar from '../components/table/SearchBar';
import SortOptions from '../components/table/SortOptions';
import ProductTable from '../components/table/ProductTable';
import Pagination from '../components/table/Pagination';
import EditModal from '../components/table/EditModal';
import AddModal from '../components/table/AddModal';
import { FaPlus } from 'react-icons/fa';

const Table = () => {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const products = await getProducts();
      
        setData(Array.isArray(products) ? products : []); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const rowsPerPage = 10;


  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

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

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteProduct(id);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setData((prevData) => [...prevData, addedProduct]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const updatedItem = await updateProduct(updatedProduct.id, updatedProduct);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update product:', error);
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

      <ProductTable
        data={currentRows}
        onEdit={setEditData}
        onDelete={handleDelete}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isEditModalOpen && (
        <EditModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateProduct}
        />
      )}

      {isAddModalOpen && (
        <AddModal
          data={{ productName: '', color: '', category: '', price: '' }}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Table;
