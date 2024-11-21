/* eslint-disable react-hooks/exhaustive-deps */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import { useLugar, useValor } from '../../context';
import './valores.scss';
import { Table } from './components/Table';
import { LineGraph } from './components/LineGraph';
import Navbar from '../../components/NavBar';

export const ValoresPage = () => {
  const { 
    searcher, handleClickOutside, showMenu, toggleMenu, search, getValoresByPagination, setPage, 
    timeFilter, setTimeFilter } = useValor();
  const { lugares, getLugares }= useLugar();

  useEffect(() => {
    getLugares();
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    getValoresByPagination(1, search, timeFilter); // Paginación inicial con el filtro de tiempo
  }, [search, timeFilter]);

  const handleTimeFilterChange = (event) => {
    const filter = event.target.value; // Obtener el valor del filtro seleccionado
    setTimeFilter(filter);
    setPage(1); // Reiniciar a la primera página cuando se aplica un nuevo filtro
    getValoresByPagination(1, search, filter); // Aplicar filtro de tiempo
  };

  const handleSearchChange = (event) => {
    searcher(event);
    setPage(1); // Reiniciar a la primera página cuando se realiza una nueva búsqueda
    getValoresByPagination(1, event.target.value, timeFilter); // Aplicar búsqueda y filtro de tiempo
  };

  return (
    <>
        <Navbar />
        <div className="container">
            <section className='graficos'>
              <LineGraph />
            </section>
            <section className="search">
              <div className='searcher'>
                <i className="bi bi-search"></i>
                <input type="text" placeholder='Buscar' onChange={handleSearchChange}/>
              </div>
              <div className="filter">
                <button className='btn-filter' onClick={toggleMenu}>Filtrar: {search}</button>
                {showMenu && (
                    <div className="filter-content">
                      {lugares.map((lugar, i) => (
                        <button className='options' key={i} value={lugar.name} onClick={handleSearchChange}>{lugar.name}</button>
                      ))}
                    </div>
                )}
              </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel className='selec-label' id="demo-select-small-label">Tiempo</InputLabel>
                <Select
                  className='select-time'
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={timeFilter}
                  label="Tiempo"
                  onChange={handleTimeFilterChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="3h">Últimas 3h</MenuItem>
                  <MenuItem value="24h">Últimas 24h</MenuItem>
                  <MenuItem value="1w">Última semana</MenuItem>
                </Select>
              </FormControl>
            </section>
            <section className="table">
              <Table />
            </section>
        </div>
    </>
  );
};


