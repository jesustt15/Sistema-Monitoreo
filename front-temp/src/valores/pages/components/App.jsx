/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import '../valores.scss';
import { useLugar, useValor } from '../../../context';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, 
  LineElement, PointElement,
  LinearScale, CategoryScale,
  Tooltip
} from 'chart.js/auto';

const ChartComponent = ({ id, chartData }) => {
    const { activeChart, setActiveChart } = useValor()
    const isActive = activeChart === id;


    ChartJS.register(
      LineElement, PointElement,
      LinearScale, CategoryScale,
      Tooltip
  );

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
  
    // useEffect(() => {
    //   fetchData(id).then(fetchedData => {
    //     setData(fetchedData);
    //   });
    // }, [id, fetchData]);
  
    const handleClick = () => {
      setActiveChart(activeChart === id ? 0 : id);
    };
  
    return (
      <div
        className={`box ${isActive && activeChart === id ? 'active' : 'inactive'}`}
        onClick={handleClick}
      >
        <Line data={chartData}  options={options}/>
      </div>
    );
  };
  
  const App = () => {
    // const fetchData = async (id) => {
    //   const response = await fetch(`https://api.example.com/chart-data/${id}`);
    //   const data = await response.json();
    //   return {
    //     labels: data.labels,
    //     datasets: [
    //       {
    //         label: data.label,
    //         data: data.data,
    //         borderColor: 'rgba(75,192,192,1)',
    //         backgroundColor: 'rgba(75,192,192,0.2)',
    //       },
    //     ],
    //   };
    // };

    const {getValores, results, activeChart} =  useValor();
    const { getLugares, lugares} = useLugar();
    const [charts, setCharts] = useState([]);

    const setHora = (fecha) => {
      const opciones = {hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    }

    useEffect(() => {
      getLugares();
   }, []);

   useEffect(() => {
      getValores();
      const labels = results.map(data => setHora(data.valueFecha));

      const data1 = results.map(data => data.tempValue);
      const data2 = results.map(data => data.humValue);
      const data3 = results.map(data => data.tempValue); // Supón otro dato
      const data4 = results.map(data => data.humValue); // Supón otro dato

      setCharts([
          {
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: 'Temperatura',
                          data: data1,
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          borderColor: 'rgba(75, 192, 192, 1)',
                          borderWidth: 1,
                          fill: true,
                          tension: 0.1,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true, grid: { display: false } },
                  },
                  plugins: { legend: { position: 'top', align: 'end' } },
              },
          },
          {
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: 'Humedad',
                          data: data2,
                          backgroundColor: 'rgba(51, 102, 255, 0.2)',
                          borderColor: 'rgba(153, 102, 255, 1)',
                          borderWidth: 1,
                          fill: true,
                          tension: 0.1,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true, grid: { display: false } },
                  },
                  plugins: { legend: { position: 'top', align: 'end' } },
              },
          },
          {
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: 'Presión',
                          data: data3,
                          backgroundColor: 'rgba(255, 51, 63, 0.2)',
                          borderColor: 'rgba(255, 159, 64, 1)',
                          borderWidth: 1,
                          fill: true,
                          tension: 0.1,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true, grid: { display: false } },
                  },
                  plugins: { legend: { position: 'top', align: 'end' } },
              },
          },
          {
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: 'Otro Métrico',
                          data: data4,
                          backgroundColor: 'rgba(255, 206, 86, 0.2)',
                          borderColor: 'rgba(255, 206, 86, 1)',
                          borderWidth: 1,
                          fill: false,
                          tension: 0.1,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: { grid: { display: false } },
                      y: { beginAtZero: true, grid: { display: false } },
                  },
                  plugins: { legend: { position: 'top', align: 'end' } },
              },
          },
      ]);
   }, [lugares]);

  
    return (

      <div className="container-box">
      <div className="active-box">
        {charts.map((chart, index) =>
          activeChart === index ? <ChartComponent key={index} id={index} chartData={chart.data} /> : null
        )}
      </div>
      <div className="inactive-boxes">
        {charts
          .filter((_, index) => index !== activeChart)
          .map((chart, index) => (
            <ChartComponent key={index} id={index} chartData={chart.data} />
          ))}
      </div>
    </div>
    );
  };
  
  export default App;