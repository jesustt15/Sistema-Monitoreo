import { useEffect } from "react";
import { useHistorico, useLugar } from "../context";

export const Table = () => {
    const { getLugares } = useLugar();
    const { results, getHistorico, page, setPage, totalPages } = useHistorico();

    useEffect(() => {
        getHistorico(page);
    }, [page]);

    const setFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    const setHora = (fecha) => {
        const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
    }

    useEffect(() => {
        getLugares();
    }, []);

    return (
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
                    {results.map((data, i) => (
                        <tr key={i}>
                            <td>{data.valore.lugare.name}</td>
                            <td>{data.valore.tempValue}°C</td>
                            <td>{data.valore.humValue}%</td>
                            <td>{setFecha(data.valore.valueFecha)}</td>
                            <td className='hora'>
                                <div className="container-hora">
                                    {setHora(data.valore.valueFecha)}
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
    )
}
