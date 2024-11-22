import { useEffect } from "react";
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
        getValoresByPagination(page, search);
    }, [page, search]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getValoresByPagination(page, search);
        }, 10000); // Actualizar cada 60 segundos

        return () => clearInterval(intervalId);
    }, [page, search, getValoresByPagination]);

    const setFecha = (fecha) => {
        return moment(fecha).tz('America/Caracas').format('YYYY-MM-DD'); // Convertir a fecha local en Caracas, Venezuela
    };

    const setHora = (fecha) => {
        return moment(fecha).tz('America/Caracas').format('HH:mm:ss'); // Convertir a hora local en Caracas, Venezuela
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                                <td>{capitalizeFirstLetter(data.Lugar.name)}</td>
                                <td>{data.tempValue}°C</td>
                                <td>{data.humValue}%</td>
                                <td>{setFecha(data.valueFecha)}</td>
                                <td className='hora'>
                                    <div className="container-hora">
                                        {setHora(data.valueFecha)}
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
            </>
        )}
        </>
    );
};






