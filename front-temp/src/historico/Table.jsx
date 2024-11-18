import { useEffect } from "react";
import { useHistorico } from "../context";
import moment from 'moment-timezone';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Table = () => {
    const { getHistorico, page, setPage, totalPages, historico, search, message } = useHistorico();

    useEffect(() => {
        getHistorico(page, search);
    }, [page, search]);

    const setFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones); 
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleDownloadPDF = async () => {
        const input = document.getElementById('table-to-print');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Añadir el encabezado antes de la tabla
        pdf.setFontSize(16);
        pdf.text('Reporte Histórico del Sensor', 10, 10);
        pdf.setFontSize(12);
        pdf.text(`Generado el: ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES')}`, 10, 20);

        // Añadir la tabla
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);

        pdf.save('reporte_historicos.pdf');
    };

    return (
        <>
            {message ? (
                <p>{message}</p> // Mostrar mensaje si no hay resultados
            ) : (
                <>
                    <button onClick={handleDownloadPDF}>Generar PDF</button>
                    <div id="table-to-print">
                        <table>
                            <thead>
                                <tr>
                                    <th>Lugar</th>
                                    <th>Temperatura</th>
                                    <th>Humedad</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody id="table-body">
                                {historico.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.Valore.Lugar.name}</td>
                                        <td>{data.Valore.tempValue}°C</td>
                                        <td>{data.Valore.humValue}%</td>
                                        <td>{setFecha(data.Valore.valueFecha)}</td>
                                        <td className='hora'>
                                            <div className="container-hora">
                                                {setHora(data.Valore.valueFecha)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button className="pass-page" onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                                {"<"}
                            </button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => setPage(number)}
                                    className={`number ${number === page ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button className="pass-page" onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                                {">"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
