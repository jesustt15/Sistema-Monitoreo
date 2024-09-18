import  { useState, useEffect } from 'react';

export const Home = () => {
  const [temperaturas, setTemperaturas] = useState([]);

  useEffect(() => {
    // Función para obtener temperaturas de la API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/temperaturas');
        const data = await response.json();
        setTemperaturas(data);
      } catch (error) {
        console.error('Error al obtener temperaturas:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>temperaturas desde la API</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Temperaturas</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {temperaturas.map((temperatura, index) => (
            <tr key={index}>
                <td>{temperatura.id}</td>
              <td>{temperatura.tempValue}</td>
              <td>{new Date(temperatura.tempFecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

