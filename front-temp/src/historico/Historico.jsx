import { useEffect } from 'react';
import { useHistorico } from '../context/HistoricoContext';
import Navbar from '../components/NavBar';
import { useLugar } from '../context';



export const Historico = () => {
  const {lugares} = useLugar();
  const {results ,getHistorico , searcher} = useHistorico();

    useEffect(() => {
      getHistorico();

  },[]);

  return (
    
    <>
    <Navbar />
      <div className="App">
      
      {lugares.map((lugar, i) => (
        <button key={i} value={lugar.name} onClick={searcher}>{lugar.name}</button>
      ))}
            <ul>
              {results.map((data, index) => (
                <li key={index}>
                  Lugar: {data.valore.lugare.name}, Temperature: {data.valore.tempValue}°C, Humidity: {data.valore.humValue}%, Fecha: {new Date(data.value_id.valueFecha).toLocaleString()}
                </li>
              ))}
            </ul>
      </div>
    </>

    
  );
}