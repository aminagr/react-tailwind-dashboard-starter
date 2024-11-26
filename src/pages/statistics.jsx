import React, { useEffect, useRef } from 'react';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import { FaUsers, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, RadialLinearScale, BarElement, Filler } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  BarElement,
  Filler
);

const Statistics = () => {


  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
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

  const barChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus Mensuels',
        data: [4000, 5000, 7000, 9000, 10000, 12000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
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

  const radarChartData = {
    labels: ['Performance A', 'Performance B', 'Performance C', 'Performance D'],
    datasets: [
      {
        label: 'Évaluations',
        data: [8, 6, 7, 5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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

  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenus Mensuels',
      },
    },
  };

  const radarChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Évaluation des Performances',
      },
    },
  };


  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 h-full p-6">

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
            <FaClipboardList className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Commandes Totales</h2>
            <p className="text-gray-600 mt-2">1 750</p>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ventes Mensuelles</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenus Mensuels</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Répartition des Utilisateurs</h2>
          <Pie data={pieChartData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Évaluation des Performances</h2>
          <Radar data={radarChartData} options={radarChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
