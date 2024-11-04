import { useEffect } from 'react';
import Navbar from '../components/NavBar';
import '../index.scss';
import { Table } from './Table';
import {  useHistorico, useLugar, useValor } from '../context';



export const Historico = () => {

  const {searcher, handleClickOutside, showMenu, toggleMenu, search} = useHistorico();
  const {lugares, getLugares} = useLugar();
 

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
    
    <>
    <div className="full-container">
    <Navbar />
        <div className="container">
          <section className="search">
            <div className='searcher'>
                  <i className="bi bi-search"></i>
                <input type="text" placeholder='Buscar'  onChange={searcher}/>
            </div>
            <div className="filter">
            <button className='btn-filter' onClick={toggleMenu}>Filtrar: {search} </button>
              {showMenu && (
                  <div className="filter-content">
                    {lugares.map((lugar, i) => (
                    <button className='options' key={i} value={lugar.name} onClick={searcher}>{lugar.name}</button>
                      ))}
                  </div>
              )}
            </div>
          </section>
              <Table />
        </div>
    </div>
    </>

    
  );
}