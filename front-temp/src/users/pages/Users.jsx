import { useState } from "react";
import Navbar from "../../components/NavBar";
import '../../index.scss';
import { Table } from "../components/Table";
import { NewUser } from "./NewUser";
import { EditUser } from "./EditUser";

export const Users = () => {
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
                    <button className="add-btn" onClick={toggleAddPopup}>Agregar Usuario | + </button>
                    {showAddPopup && <NewUser onClose={toggleAddPopup} />}
                    {showEditPopup && <EditUser id={currentLugarId} onClose={closeEditPopup} />} 
                    <Table openEditPopup={openEditPopup} />
                </div>
            </div>
        </>
    );
};
