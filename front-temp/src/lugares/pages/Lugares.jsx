import { useEffect, useState} from "react";
import { useLugar } from "../../context";
import Navbar from "../../components/NavBar";
import '../../index.scss';
import { Link } from "react-router-dom";



export const Lugares = () => {

 const {lugares, getLugares, deleteLugar} = useLugar();


      useEffect(() => {
         getLugares();
    
    },[]);

    const [visibleItems, setVisibleItems] = useState({});

    const toggleVisibility = (id) => {
      setVisibleItems(prevState => ({ 
        ...prevState, 
        [id]: !prevState[id] 
      }));
    };

    
      
  return (
  <>
    <Navbar />
    <div className="full-container">
        <div className="container">
          <Link to={'/new-lugar'}>Agregar</Link>
            <ul>
                  {lugares.map((lugar) => (
                    <li key={lugar.lugar_id}>
                      Nombre: {lugar.name}, Temperatura Maxima: {lugar.tempMax}°C, Temperatura Minima: {lugar.tempMin}°C,  
                      Humedad Minima: {lugar.humMin}%,  Humedad Maxima: {lugar.humMax}%
                      ID:  <button onClick={() => toggleVisibility(lugar.lugar_id)}>
                          {visibleItems[lugar.lugar_id] ? 'Ocultar' : 'Mostrar'}
                        </button>
                        {visibleItems[lugar.lugar_id] && <div>{lugar.lugar_id}</div>}
                      <button onClick={() => deleteLugar(lugar.lugar_id)} > Eliminar</button>
                      <Link to={`/lugares/${lugar.lugar_id}`}>Editar</Link>
                    </li>
                  ))}
            </ul>
        </div>
    </div>
  </>
    
  )
}
