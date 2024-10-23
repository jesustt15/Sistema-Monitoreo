import { useEffect } from 'react';
import { useLugar, useValor } from '../../context';
import './valores.scss';




export const ValoresPage = () => {
  const {results ,searcher ,getValores, handleClickOutside,  showMenu, toggleMenu } = useValor();
  const {getLugares, lugares}= useLugar()



    const setFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
      }

      const setHora = (fecha) => {
        const opciones = {hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(fecha).toLocaleTimeString('es-ES', opciones);
      }

  useEffect(() => {
    getLugares();

},[]);  
  
useEffect(() => {
      getValores();

  },[]);



  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
}, [showMenu]);

  return (
    

    <div className="full-container">
      <div className="container">
        <section className="search">
          <div className='searcher'>
                <i className="bi bi-search"></i>
              <input type="text" placeholder='Buscar' />
          </div>
          <div className="filter">
          <button className='btn-filter' onClick={toggleMenu}>Filtrar</button>
            {showMenu && (
                <div className="filter-content">
                  {lugares.map((lugar, i) => (
                  <button className='options' key={i} value={lugar.name} onClick={searcher}>{lugar.name}</button>
                    ))}
                </div>
            )}
          </div>
        </section>
        <section className="table">
          <table>
              <thead>
                  <tr>
                      <th>Lugar</th>
                      <th>Temperatura</th>
                      <th>Humedad</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                  </tr>
              </thead>
              <tbody id="table-body">
                  {results.map( (data, i)  => (
                    <tr key={i}>
                        <td>{data.lugare.name}</td>
                        <td>{data.tempValue}°C</td>
                        <td>{data.humValue}%</td>
                        <td>{setFecha(data.valueFecha)}</td>
                        <td>{setHora(data.valueFecha)}</td>
                    </tr>
                  ))}
              </tbody>
          </table>
        </section>
      </div>  
    </div>
    
  );
}