import { useState, useEffect } from 'react';
import { ExpandableChart } from './ExpandableChart';
import { useValor } from '../../../context';

export const LineGraph = () => {
    const [charts, setCharts] = useState([]);
    const { getValores, valores, activeChart, search } = useValor();

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    };

    useEffect(() => {
        getValores(search);
    }, [search]);

    useEffect(() => {
        const labels = valores.map((data) => setHora(data.valueFecha));
        const data1 = valores.map((data) => data.tempValue);
        const data2 = valores.map((data) => data.humValue);
        const data3 = valores.map((data) => data.tempValue); // Supón otro dato
        const data4 = valores.map((data) => data.humValue); // Supón otro dato

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
    }, [valores]);

    return (
        <>
            <div className="charts-container">
                <div className="expanded-container">
                    {charts.map((chart, index) =>
                        activeChart === index ? <ExpandableChart key={index} index={index} chartData={chart.data} /> : null
                    )}
                </div>
                <div className="thumbnail-container">
                    {charts
                        .filter((_, i) => i !== activeChart)
                        .map((chart, index) => (
                            <ExpandableChart key={index} index={charts.findIndex((c) => c === chart)} chartData={chart.data} />
                        ))}
                </div>
            </div>
        </>
    );
};


