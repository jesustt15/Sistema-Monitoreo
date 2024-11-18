/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import '../index.scss';
import { Table } from './Table';
import { useHistorico, useLugar } from '../context';

export const Historico = () => {
    const { searcher, handleClickOutside, showMenu, toggleMenu, search, setFilter } = useHistorico();
    const { lugares, getLugares } = useLugar();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        getLugares();
    }, []);

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setFilter({ type: 'mes', value: e.target.value });
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
        setFilter({ type: 'año', value: e.target.value });
    };

    return (
        <>
            <div className="full-container">
                <Navbar />
                <div className="container">
                    <section className="search">
                        <div className='searcher'>
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder='Buscar' onChange={searcher} />
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
                    <section className="filter-options">
                        <label>
                            Filtrar por Mes:
                            <select value={month} onChange={handleMonthChange}>
                                <option value="">Seleccionar Mes</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Filtrar por Año:
                            <input type="number" value={year} onChange={handleYearChange} placeholder="Ingrese Año" />
                        </label>
                    </section>
                    <section>
                        <Table />
                    </section>
                </div>
            </div>
        </>
    );
};

