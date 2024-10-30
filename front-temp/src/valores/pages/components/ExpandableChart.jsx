/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js/auto';
import '../valores.scss'; // Asegúrate de crear este archivo CSS
import { useValor } from '../../../context';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export const ExpandableChart = ({ chartData, index }) => {
  const { activeChart, setActiveChart } = useValor();
  const isActive = activeChart === index;

  const handleClick = () => {
    setActiveChart(isActive ? -1 : index);
  };

  const options = {
    responsive: true,
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' °C'; // Personaliza el formato de la etiqueta
            }
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: { boxWidth: 10, padding: 20 },
      },
    },
  };

  return (
    <div
      className={`chart-container ${isActive ? 'expanded' : 'thumbnail'}`}
      onClick={handleClick}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};


