import {Chart as ChartJS, 
    LineElement, PointElement,
    LinearScale, CategoryScale,
    Tooltip
} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useLugar, useValor } from '../../../context';
import { useEffect, useState } from 'react';


ChartJS.register(
    LineElement, PointElement,
    LinearScale, CategoryScale,
    Tooltip
);


export const LineGraph = () => {

    const {results ,getValores, 
        } = useValor();
    const {getLugares, lugares}= useLugar();
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };


    const setHora = (fecha) => {
      const opciones = {hour: '2-digit', minute: '2-digit' };
      return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    }

    useEffect(() => {
  getLugares();

        },[]);  

    useEffect(() => {
    getValores();

        },[ lugares]);

    

        
    const labels = results.map(item => setHora(item.valueFecha));

    const lineData = {
        
            labels: labels,
            datasets: [
              {label: "Temperatura",
              data: results.map((data) => data.tempValue ),
              backgroundColor: '#3366FF',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
              tension: 0.1 // Para suavizar las líneas
            }
          ]
          
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                max: 45, // Ajusta este valor según tus necesidades
                min: -5, // Ajusta este valor según tus necesidades
                grid: {
                    display: false,
                },
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
                    }
                }
            },
            legend: {
                display: true,
                position: 'top',
                align: 'end', // Ajustar la posición a la derecha
                labels: {
                    boxWidth: 15,
                    padding: 40,
                },
            },
        },
    };
            

  return (
    
    <div className={`chart-container ${expanded ? 'expanded' : 'thumbnail'}`} onClick={handleClick}>
        <Line data={lineData} options={options} />
    </div>
  )
}
