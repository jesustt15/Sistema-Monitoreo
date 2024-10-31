import { useEffect } from 'react';
import { useLugar, useValor } from '../../context';
import './valores.scss';
import { Table } from './components/Table';
import { LineGraph } from './components/LineGraph';




export const ValoresPage = () => {
  const { searcher , handleClickOutside,  showMenu, toggleMenu, 
  } = useValor();
  const { lugares, getLugares}= useLugar()


  useEffect(() => {
    getLugares();
  

  }, [])
  


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
          <LineGraph />
        </section>
        <section className="search">
          <div className='searcher'>
                <i className="bi bi-search"></i>
              <input type="text" placeholder='Buscar'  onChange={searcher}/>
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