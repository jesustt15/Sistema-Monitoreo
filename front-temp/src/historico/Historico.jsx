/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import '../index.scss';
import { Table } from './Table';
import { useHistorico, useLugar } from '../context';

export const Historico = () => {
    const { searcher, handleClickOutside, handleClickOutsideMonth, showMenu, showMenuMonth, toggleMenu, toggleMenuMonth, search, setFilter } = useHistorico();
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

    useEffect(() => {
        window.addEventListener('click', handleClickOutsideMonth);
        return () => {
            window.removeEventListener('click', handleClickOutsideMonth);
        };
    }, [showMenuMonth]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setFilter({ type: 'mes', value: e.target.value });
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
        setFilter({ type: 'año', value: e.target.value });
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <div className="full-container">
                <Navbar />
                <div className="container">
                    <section className="search">
                        <div className="searcher">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Buscar" onChange={searcher} />
                        </div>
                        <div className="filter-container">
                            
                        </div>
                        <div className="filter">
                            <button className="btn-filter" onClick={toggleMenu}>Filtrar: {capitalizeFirstLetter(search)}</button>
                            {showMenu && (
                                <div className="filter-content">
                                    {lugares.map((lugar, i) => (
                                        <button className="options" key={i} value={lugar.name} onClick={searcher}>{capitalizeFirstLetter(lugar.name)}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="filter-month">
                            <div className='month-label'>
                                Mes
                            </div>
                            <button className="btn-filter-month" onClick={toggleMenuMonth}>
                                {month}</button>
                            {showMenuMonth && (
                                <div className="filter-content-month">
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <button className="options" key={month} value={month} onClick={handleMonthChange}>{month}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="searcher-year">
                            <div className="month-label">Año</div>
                            <input type="number" value={year} onChange={handleYearChange} placeholder="Ingrese Año" />
                        </div>
                        
                    </section>
                    <section className="filter-options"></section>
                    <section>
                        <Table />
                    </section>
                </div>
            </div>
        </>
    );
};
