import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StarTrendLine = ({ data }) => {
  const chartData = {
    labels: data.map(repo => repo.name),
    datasets: [
      {
        label: 'Stars',
        data: data.map(repo => repo.stars),
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45, 212, 191, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: '#1e293b' },
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { display: false },
      },
    },
  };
  return <Line data={chartData} options={options} />;
}

export default StarTrendLine;