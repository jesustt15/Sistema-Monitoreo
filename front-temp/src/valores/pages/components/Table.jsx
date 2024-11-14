import  { useEffect } from "react";
import { useValor } from "../../../context";
import moment from 'moment-timezone';

export const Table = () => {
    const { valores, getValoresByPagination, handleClickOutside, showMenu, 
        page, totalPages, setPage, search, message } = useValor();

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    useEffect(() => {
        getValoresByPagination(page, search); // Cambiar tamaño de página a 20
    }, [page, search]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getValoresByPagination(page, search); // Cambiar tamaño de página a 20
        }, 20000); // Actualizar cada 60 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [page, search, getValoresByPagination]);

    const setFecha = (fecha) => {
        return moment(fecha).tz('America/Caracas').format('YYYY-MM-DD'); // Convertir a fecha local en Caracas, Venezuela
    };

    const setHora = (fecha) => {
        return moment(fecha).tz('America/Caracas').format('HH:mm:ss'); // Convertir a hora local en Caracas, Venezuela
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
        {message ? ( 
            <p>{message}</p>
        ) : (
            <>
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
                        {valores.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Lugar.name}</td>
                                <td>{data.tempValue}°C</td>
                                <td>{data.humValue}%</td>
                                <td>{setFecha(data.valueFecha)}</td>
                                <td>{setHora(data.valueFecha)}</td>
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
            </>
        )}
        </>
    );
};





