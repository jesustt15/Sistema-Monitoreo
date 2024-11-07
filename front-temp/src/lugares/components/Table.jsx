import { useEffect, useState } from "react";
import { useLugar } from "../../context";
import '../../components/components.scss';
import { Link } from "react-router-dom";

export const Table = () => {
  
    const {lugares, getLugares, deleteLugar} = useLugar();
    const [visibleItems, setVisibleItems] = useState({});

    const toggleVisibility = (id) => {
        setVisibleItems(prevState => ({ 
            ...prevState, 
            [id]: !prevState[id] 
        }));
    };

    useEffect(() => {
        getLugares();
    }, []);  

    useEffect(() => {
        const initialVisibility = {};
        lugares.forEach(lugar => {
            initialVisibility[lugar.lugar_id] = false;
        });
        setVisibleItems(initialVisibility);
    }, [lugares]);  // Este efecto se ejecutará cada vez que cambien los lugares

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Localidad</th>
                        <th>Temperatura Max</th>
                        <th>Temperatura Min</th>
                        <th>Humedad Max</th>
                        <th>Humedad Min</th>
                        <th>ID</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {lugares.map((data, i) => (
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.tempMax}°C</td>
                            <td>{data.tempMin}°C</td>
                            <td>{data.humMax}%</td>
                            <td>{data.humMin}%</td>
                            <td className="show-id">
                                {visibleItems[data.lugar_id] ? data.lugar_id : '*****'}
                                <button className="btn-show" onClick={() => toggleVisibility(data.lugar_id)}>
                                    {visibleItems[data.lugar_id] ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                                </button>
                            </td>
                            <td className="acciones">
                                <button className="btn-delete" onClick={() => deleteLugar(data.lugar_id)}> Eliminar</button>
                                <Link className="edit" to={`/lugares/${data.lugar_id}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
