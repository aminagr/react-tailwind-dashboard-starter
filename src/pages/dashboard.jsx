import React, { useEffect } from 'react'; 
import { FaUsers, FaChartLine, FaCogs, FaShoppingCart, FaRegBell, FaDollarSign } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Ventes Mensuelles',
        data: [5000, 8000, 7500, 10000, 12000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };


  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Évolution des Ventes',
      },
    },
  };


  const pieChartData = {
    labels: ['Utilisateurs Actifs', 'Utilisateurs Inactifs', 'Utilisateurs Suspendus'],
    datasets: [
      {
        label: 'Répartition des Utilisateurs',
        data: [800, 300, 150],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-100 h-full p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Utilisateurs Totaux</h2>
            <p className="text-gray-600 mt-2">1 250</p>
          </div>
        </div>
        

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaDollarSign className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Ventes Totales</h2>
            <p className="text-gray-600 mt-2">48 300 $</p>
          </div>
        </div>
        

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaShoppingCart className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Revenus Ce Mois</h2>
            <p className="text-gray-600 mt-2">12 500 $</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-purple-500 text-white p-3 rounded-full">
            <FaChartLine className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Taux de Croissance</h2>
            <p className="text-gray-600 mt-2">+15,8%</p>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-red-500 text-white p-3 rounded-full">
            <FaRegBell className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            <p className="text-gray-600 mt-2">3 nouvelles alertes</p>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-gray-500 text-white p-3 rounded-full">
            <FaCogs className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Paramètres Système</h2>
            <p className="text-gray-600 mt-2">Gérez vos paramètres</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        
  
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ventes Mensuelles</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

 
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Répartition des Utilisateurs</h2>
          <Pie data={pieChartData} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
