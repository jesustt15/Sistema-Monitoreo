import { useEffect } from "react";
import { useValor } from "../../../context";

export const Table = () => {
    const { valores, getValoresByPagination, handleClickOutside, showMenu, 
        page, totalPages, setPage, search, message } = useValor();

    const setFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    useEffect(() => {
        getValoresByPagination(page, search);
    }, [page, search]);

    // Nuevo useEffect para actualizar la tabla automáticamente
    useEffect(() => {
        const intervalId = setInterval(() => {
            getValoresByPagination(page, search);
        }, 30000); // Actualizar cada 60 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [page, search, getValoresByPagination]);

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



