import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageDoughnut = ({ data }) => {
  const languageCounts = data.reduce((acc, repo) => {
    const lang = repo.language || 'Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(languageCounts),
    datasets: [{
      label: 'No. of Repos',
      data: Object.values(languageCounts),
      backgroundColor: [
        '#2dd4bf', '#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#4ade80', '#f87171', '#9ca3af'
      ],
      borderColor: '#0f172a',
      borderWidth: 2
    }],
  };

  const options = {
    reponsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          boxWidth: 12,
          padding: 20,
        }
      }
    }
  };

  return <Doughnut data={chartData} options={options} />
}

export default LanguageDoughnut;
