import React, { useState } from 'react';
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa'; 

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md flex justify-between items-center w-full">
      
      <button onClick={toggleSidebar} className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="relative flex items-center w-full max-w-md mx-4 md:mx-8">
    

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Rechercher..."
        className="w-full py-2 px-4 pr-10 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
      />



        <FaSearch className="absolute right-3 h-5 w-5 text-white" />
      </div>

      <div className="flex items-center space-x-4 ml-4 md:ml-8">
        <FaEnvelope className="h-5 w-5 text-white cursor-pointer hover:text-blue-500 transition-colors" />
        <FaBell className="h-5 w-5 text-white cursor-pointer hover:text-blue-500 transition-colors" />
      </div>
    </nav>
  );
};

export default Navbar;
