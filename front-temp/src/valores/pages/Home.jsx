import { useEffect } from 'react';
import { useValor } from '../../context';




export const Home = () => {
  const {results ,searcher ,getValores} = useValor();

    useEffect(() => {
      getValores();

  },[]);

  return (
    
    <div className="App">
      <button value={'Guayana'} onClick={searcher}>Guayana</button>
      <button value={'Planta'} onClick={searcher}>Planta</button>
      <button value={'Caracas'} onClick={searcher}>Caracas</button>
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




