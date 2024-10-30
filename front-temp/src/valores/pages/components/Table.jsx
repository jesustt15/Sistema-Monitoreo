import { useEffect } from "react";
import { useValor } from "../../../context";

export const Table = () => {
    const { valores,  handleClickOutside, showMenu, page, totalPages, setPage, searcher } = useValor();

    const setFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <>
            <input type="text" onChange={searcher} placeholder="Filter by location" />
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
                            <td>{data.lugare.name}</td>
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
                <span>{page} - {totalPages} Pág</span>
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                    {"<"}
                </button>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    {">"}
                </button>
            </div>
        </>
    );
}
