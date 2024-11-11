import { useState } from "react";
import Navbar from "../../components/NavBar";
import '../../index.scss';
import { Table } from "../components/Table";
import { NewLugar } from "./NewLugar";
import { ActualizarLugar } from "./ActualizarLugar";

export const Lugares = () => {
    const [showAddPopup, setShowAddPopup] = useState(false); 
    const [showEditPopup, setShowEditPopup] = useState(false); 
    const [currentLugarId, setCurrentLugarId] = useState(null); 
    
    const toggleAddPopup = () => { 
        setShowAddPopup(!showAddPopup); }; 
    
    const openEditPopup = (id) => {  
        setCurrentLugarId(id); 
        setShowEditPopup(true); 
    }; 
    
    const closeEditPopup = () => { 
        setCurrentLugarId(null); 
        setShowEditPopup(false); 
    };

    return (
        <>
            <div className="full-container">
                <Navbar />
                <div className="container">
                    <button className="add-btn" onClick={toggleAddPopup}>Agregar Localidad | + </button>
                    {showAddPopup && <NewLugar onClose={toggleAddPopup} />}
                    {showEditPopup && <ActualizarLugar id={currentLugarId} onClose={closeEditPopup} />} 
                    <Table openEditPopup={openEditPopup} />
                </div>
            </div>
        </>
    );
};

