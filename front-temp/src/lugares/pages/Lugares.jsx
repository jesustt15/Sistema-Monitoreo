import { useEffect} from "react";
import Navbar from "../../valores/components/NavBar";
import { useLugar } from "../../context";



export const Lugares = () => {

 const {lugares, getLugares} = useLugar();

      useEffect(() => {
         getLugares();
    
    },[]);

    
      
  return (
  <>
    <Navbar />
    <div>Lugares</div>
    <ul>
          {lugares.map((lugar, index) => (
            <li key={index}>
              Nombre: {lugar.name}, Temperatura Maxima: {lugar.tempMax}°C, Temperatura Minima: {lugar.tempMin}°C,  
              Humedad Minima: {lugar.humMin}%,  Humedad Maxima: {lugar.humMax}%
              ID: {lugar._id}
            </li>
          ))}
      </ul>
  </>
    
  )
}