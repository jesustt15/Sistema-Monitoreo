import { useEffect } from 'react';
import { useLugar, useValor } from '../../context';
import './valores.scss';
import { Table } from './components/Table';
import {Line} from 'react-chartjs-2';
import { LineGraph } from './components/LineGraph';




export const ValoresPage = () => {
  const { searcher ,getValores, handleClickOutside,  showMenu, toggleMenu, page
  } = useValor();
  const {getLugares, lugares}= useLugar()


  useEffect(() => {
    getLugares();

},[]);  
  
useEffect(() => {
      getValores();

  },[page, lugares]);



  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
}, [showMenu]);

  return (
    

    <div className="full-container">
      <div className="container">
        <section className='graficos'>
              <div className="estadisticas">
              <Line
                      data={{
                        labels: ['a', 'b'],
                        datasets: [{

                          label: "revenue",
                          data: [5, 6 ,7 ,8]
                        }]
                      }} />
                                    <Line
                      data={{
                        labels: ['a', 'b'],
                        datasets: [{

                          label: "revenue",
                          data: [5, 6 ,7 ,8]
                        }]
                      }} />
                                    <Line
                      data={{
                        labels: ['a', 'b'],
                        datasets: [{

                          label: "revenue",
                          data: [5, 6 ,7 ,8]
                        }]
                      }} />
              </div>
              <div className="estadistica-principal">
                      <LineGraph />
              </div> 
        </section>
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
            <Table />
        </section>
      </div>  
    </div>
    
  );
}