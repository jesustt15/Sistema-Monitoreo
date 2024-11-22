/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getHistoricoRequest } from '../api';

const HistoricoContext = createContext();

export const useHistorico = () => {
    const context = useContext(HistoricoContext);
    if (!context) {
        throw new Error('useHistorico debe estar en el contexto');
    }
    return context;
};

export function HistoricoProvider({ children }) {
    const [historico, setHistorico] = useState([]);
    const [search, setSearch] = useState("guayana");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showMenu, setShowMenu] = useState(false);
    const [showMenuMonth, setShowMenuMonth] = useState(false);
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState({ type: '', value: '' });

    const getHistorico = async (page, search = 'guayana', filter) => {
        try {
            const res = await getHistoricoRequest(page, search.toLocaleLowerCase(), filter);
            if (res && res.data) {
                setHistorico(res.data.items);
                setTotalPages(res.data.totalPages); 
                if (res.data.items.length === 0) {
                    setMessage('No existe esa localidad o No hay Valores para mostrar');
                } else {
                    setMessage('');
                }
            }
        } catch (error) {
            console.log('Error fetching historico:', error);
        }
    };

    useEffect(() => {
        getHistorico(page, search, filter);
    }, [page, search, filter]);

    const searcher = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const toggleMenu = (event) => {
        event.preventDefault();
        setShowMenu(!showMenu);
        if (showMenuMonth) setShowMenuMonth(false); // Asegúrate de cerrar el otro menú
    };

    const toggleMenuMonth = (event) => {
        event.preventDefault();
        setShowMenuMonth(!showMenuMonth);
        if (showMenu) setShowMenu(false); // Asegúrate de cerrar el otro menú
    };

    const handleClickOutsideMonth = (event) => {
        if (showMenuMonth && !event.target.closest('.filter-month')) {
            setShowMenuMonth(false);
        }
    };

    const handleClickOutside = (event) => {
        if (showMenu && !event.target.closest('.filter')) {
            setShowMenu(false);
        }
    };

    return (
        <HistoricoContext.Provider value={{
            page,
            totalPages,
            historico,
            search,
            showMenu,
            showMenuMonth,
            message,
            filter,
            searcher,
            getHistorico,
            setPage,
            toggleMenu,
            toggleMenuMonth,
            handleClickOutside,
            handleClickOutsideMonth,
            setFilter,
        }}>
            {children}
        </HistoricoContext.Provider>
    );
}
