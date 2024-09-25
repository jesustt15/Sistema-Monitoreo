import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../../valores/components/NavBar";



export const Lugares = () => {
  const [lugaresData, setlugaresData] = useState([]);


  
  useEffect(() => {
    axios.get('http://localhost:3000/sensor/lugares')
      .then(response => {
        setlugaresData(response.data);
      })
      .catch(error => {
        console.error('Error en traer los datos', error);
      });
  }, []);

 
 
  return (
  <>
    <Navbar />
    <div>Lugares</div>
    <ul>
          {lugaresData.map((lugar, index) => (
            <li key={index}>
              Nombre: {lugar.name}, Temperatura Maxima: {lugar.tempMax}°C, Temperatura Minima: {lugar.tempMin}°C,  
              Humedad Minima: {lugar.humMin}%,  Humedad Maxima: {lugar.humMax}%
            </li>
          ))}
      </ul>
  </>
    
  )
}
