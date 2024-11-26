import React, { useState } from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-x-auto"> 
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-0 overflow-x-auto"> 
          {children}
        </main>

      </div>
    </div>
  );
};


export default DashboardLayout;
