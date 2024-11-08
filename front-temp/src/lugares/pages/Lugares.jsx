import { useState } from "react";
import Navbar from "../../components/NavBar";
import '../../index.scss';
import { Table } from "../components/Table";
import { NewLugar } from "./NewLugar";

export const Lugares = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <div className="full-container">
                <Navbar />
                <div className="container">
                    <button onClick={togglePopup}>Agregar</button>
                    {showPopup && <NewLugar onClose={togglePopup} />}
                    <Table />
                </div>
            </div>
        </>
    );
};

