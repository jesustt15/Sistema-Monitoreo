/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUser } from "../../context";
import '../../components/components.scss';
import { ConfirmationPopup }  from "./ConfirmationPopup"  // Importamos el componente del popup de confirmación

export const Table = ({ openEditPopup }) => {
  
    const { users, getUsers, deleteUsers } = useUser();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedLugarId, setSelectedLugarId] = useState(null);


    const openConfirmationPopup = (id) => {
        setSelectedLugarId(id);
        setShowConfirmation(true);
    };

    const handleDelete = () => {
        deleteUsers(selectedLugarId);
        setShowConfirmation(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

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
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {users.map((data, i) => (
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                            <td className="acciones">
                                <button className="edit" onClick={() => openEditPopup(data.user_id)}>
                                    <i className="bi bi-pencil-square"></i>
                                    <span className="tooltiptext">Click Editar Usuario</span>
                                </button>
                                <button className="btn-delete" onClick={() => openConfirmationPopup(data.user_id)}>
                                    <i className="bi bi-trash3"></i>
                                    <span className="tooltiptext">Eliminar Usuario</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
