import { useEffect, useState } from 'react';
import '../components/components.css';
import axios from 'axios';
import Navbar from '../components/NavBar';



export const Home = () => {
  const [valoresData, setvaloresData] = useState([]);
  const [search, setSearch] = useState("Guayana");

  ;

  useEffect(() => {
    axios.get('http://localhost:3000/sensor/valores')
      .then(response => {
        setvaloresData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the valores data!', error);
      });
  }, []);

  //buscador

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  // metodo filtrado
  let results = [];

  if(!search){
    results = valoresData;
  }else {
    results =  valoresData.filter((dato) => dato.lugar.name.includes(search))
  }

  return (
    
    <div className="App">
      <Navbar />
      <button value={'Guayana'} onClick={searcher}>Guayana</button>
      <button value={'Planta'} onClick={searcher}>Planta</button>
        <ul>
          {results.map((data, index) => (
            <li key={index}>
              Lugar: {data.lugar.name}, Temperature: {data.tempValue}°C, Humidity: {data.humValue}%, Fecha: {data.valueFecha}
            </li>
          ))}
        </ul>
    </div>
    
  );
}




