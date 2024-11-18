/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ExpandableChart } from './ExpandableChart';
import { useLugar, useValor } from '../../../context';

export const LineGraph = () => {
    const [charts, setCharts] = useState([]);
    const { getValores, valores, activeChart, search } = useValor();
    const { getOneLugar, lugar } = useLugar(); // Usar lugar singular

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    };

    useEffect(() => {
        getValores(search);
    }, [search]);

    useEffect(() => { 
        if (valores.length > 0) {
            getOneLugar(valores[0].lugar_id); // Usar el lugar_id del primer valor
        }
    }, [valores]);

    useEffect(() => {
        const labels = valores.map((data) => setHora(data.valueFecha));
        const data1 = valores.map((data) => data.tempValue);
        const data2 = valores.map((data) => data.humValue);

        if (lugar) { // Asegúrate de que lugar no sea null
            const tempMin = lugar.tempMin; // Obtener tempMin del lugar específico
            const tempMax = lugar.tempMax;
            const humMin = lugar.humMin;
            const humMax = lugar.humMax;

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
                            {
                                label: 'Temp Min',
                                data: Array(data1.length).fill(tempMin),
                                borderColor: 'rgba(255, 0, 0, 1)',
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [5, 5],
                                fill: false
                            },
                            {
                                label: 'Temp Max',
                                data: Array(data1.length).fill(tempMax),
                                borderColor: 'rgba(255, 0, 0, 1)',
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [5, 5],
                                fill: false
                            }
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
                            {
                                label: 'Hum Min',
                                data: Array(data2.length).fill(humMin),
                                borderColor: 'rgba(255, 0, 0, 1)',
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [5, 5],
                                fill: false
                            },
                            {
                                label: 'Hum Max',
                                data: Array(data2.length).fill(humMax),
                                borderColor: 'rgba(255, 0, 0, 1)',
                                borderWidth: 1,
                                pointRadius: 0,
                                borderDash: [5, 5],
                                fill: false
                            }
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
        }
    }, [valores, lugar]); // Asegúrate de que este useEffect depende tanto de valores como de lugar

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

