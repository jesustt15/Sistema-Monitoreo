import { useEffect} from "react";
import { useLugar } from "../../context";
import Navbar from "../../components/NavBar";
import { Link } from "react-router-dom";



export const Lugares = () => {

 const {lugares, getLugares, deleteLugar} = useLugar();


      useEffect(() => {
         getLugares();
    
    },[]);

    
      
  return (
  <>
    <Navbar />
    <div>Lugares</div>
    <Link to={'/new-lugar'}>Agregar</Link>
    <ul>
          {lugares.map((lugar) => (
            <li key={lugar.lugar_id}>
              Nombre: {lugar.name}, Temperatura Maxima: {lugar.tempMax}°C, Temperatura Minima: {lugar.tempMin}°C,  
              Humedad Minima: {lugar.humMin}%,  Humedad Maxima: {lugar.humMax}%
              ID: {lugar._id}
              <button onClick={() => deleteLugar(lugar.lugar_id)} > Eliminar</button>
              <Link to={`/lugares/${lugar.lugar_id}`}>Editar</Link>
            </li>
          ))}
      </ul>
  </>
    
  )
}
