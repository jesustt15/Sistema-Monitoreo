import { useState, useEffect } from 'react';
import {ExpandableChart} from './ExpandableChart';
import { useLugar, useValor } from '../../../context';

export const LineGraph = () => {
    const [charts, setCharts] = useState([]);
    const {getValores, results} =  useValor();
    const { getLugares} = useLugar();
   

    useEffect(() => {
       getValores();
    }, []);

    useEffect(() => {
        getLugares();
     }, []);

     useEffect(() => {
            
        const labels = results.map(data => data.lugare.name);

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
     
     }, [])
     
 

    return (

            <>    
                 <div className="charts-container">
                        {charts.map((chart,index) => (
                        <ExpandableChart key={index} index={index} chartData={chart.data} />
                        ))}
                </div>
            </>
    );
};
