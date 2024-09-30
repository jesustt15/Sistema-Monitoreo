import { useEffect } from 'react';
import { useLugar, useValor } from '../../context';




export const ValoresPage = () => {
  const {results ,searcher ,getValores} = useValor();
  const {getLugares, lugares}= useLugar()

  useEffect(() => {
    getLugares();

},[]);  
  useEffect(() => {
      getValores();

  },[]);

  return (
    
    <div className="App">
      {lugares.map((lugar, i) => (
        <button key={i} value={lugar.name} onClick={searcher}>{lugar.name}</button>
      ))}
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