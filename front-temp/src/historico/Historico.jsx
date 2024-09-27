import { useEffect } from 'react';
import { useHistorico } from '../context/HistoricoContext';
import Navbar from '../components/NavBar';



export const Historico = () => {
  const {results ,getHistorico , searcher} = useHistorico();

    useEffect(() => {
      getHistorico();

  },[]);

  return (
    
    <>
    <Navbar />
      <div className="App">
          <button value={'Guayana'} onClick={searcher}>Guayana</button>
          <button value={'Planta'} onClick={searcher}>Planta</button>
          <button value={'Caracas'} onClick={searcher}>Caracas</button>
            <ul>
              {results.map((data, index) => (
                <li key={index}>
                  Lugar: {data.value_id.lugar.name}, Temperature: {data.value_id.tempValue}°C, Humidity: {data.value_id.humValue}%, Fecha: {new Date(data.value_id.valueFecha).toLocaleString()}
                </li>
              ))}
            </ul>
      </div>
    </>

    
  );
}