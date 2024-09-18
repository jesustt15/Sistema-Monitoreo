import  { useState, useEffect } from 'react';

export const Home = () => {
  const [valores, setValores] = useState([]);

  useEffect(() => {
    // Función para obtener temperaturas de la API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/sensor/valores');
        const data = await response.json();
        setValores(data);
      } catch (error) {
        console.error('Error al obtener temperaturas:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Valores desde la API</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Temperaturas</th>
            <th>Humedad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {valores.map((valor, index) => (
            <tr key={index}>
                <td>{valor.id}</td>
              <td>{valor.tempValue}</td>
              <td>{valor.humValue}</td>
              <td>{new Date(valor.valueFecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

