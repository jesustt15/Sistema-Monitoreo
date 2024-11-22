/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLugar } from "../../context";
import '../../components/components.scss';
import { ConfirmationPopup }  from "./ConfirmationPopup"  // Importamos el componente del popup de confirmación

export const Table = ({ openEditPopup }) => {
  
    const { lugares, getLugares, deleteLugar } = useLugar();
    const [visibleItems, setVisibleItems] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedLugarId, setSelectedLugarId] = useState(null);

    const toggleVisibility = (id) => {
        setVisibleItems(prevState => ({ 
            ...prevState, 
            [id]: !prevState[id] 
        }));
    };

    const openConfirmationPopup = (id) => {
        setSelectedLugarId(id);
        setShowConfirmation(true);
    };

    const handleDelete = () => {
        deleteLugar(selectedLugarId);
        setShowConfirmation(false);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    useEffect(() => {
        getLugares();
        const initialVisibility = {};
        lugares.forEach(lugar => {
            initialVisibility[lugar.lugar_id] = false;
        });
        setVisibleItems(initialVisibility);
    }, []);

    useEffect(() => {
        getLugares(); //useEfectt para actualizar
    }, [lugares]);
    

    return (
        <>
            {showConfirmation && (
                <ConfirmationPopup 
                    message="¿Estás seguro?" 
                    onConfirm={handleDelete} 
                    onCancel={() => setShowConfirmation(false)} 
                />
            )}
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
                            <td>{capitalizeFirstLetter(data.name)}</td>
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
                                <button className="edit" onClick={() => openEditPopup(data.lugar_id)}>
                                    <i className="bi bi-pencil-square"></i>
                                    <span className="tooltiptext">Click Editar Lugar</span>
                                </button>
                                <button className="btn-delete" onClick={() => openConfirmationPopup(data.lugar_id)}>
                                    <i className="bi bi-trash3"></i>
                                    <span className="tooltiptext">Eliminar Lugar</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
