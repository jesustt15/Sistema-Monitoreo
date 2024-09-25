import { useEffect, useState } from 'react';
import '../components/components.css';
import axios from 'axios';
import Navbar from '../components/NavBar';
import { useValor } from '../../context';



export const Home = () => {
  const {results ,searcher ,getValores} = useValor();

    useEffect(() => {
      getValores();

  },[]);

  return (
    
    <div className="App">
      <Navbar />
      <button value={'Guayana'} onClick={searcher}>Guayana</button>
      <button value={'Planta'} onClick={searcher}>Planta</button>
        <ul>
          {results.map((data, index) => (
            <li key={index}>
              Lugar: {data.lugar.name}, Temperature: {data.tempValue}°C, Humidity: {data.humValue}%, Fecha: {new Date(data.valueFecha).toLocaleString()}
            </li>
          ))}
        </ul>
    </div>
    
  );
}




