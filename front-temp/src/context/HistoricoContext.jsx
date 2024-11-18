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
}

export function HistoricoProvider({ children }) {
    const [historico, setHistorico] = useState([]);
    const [search, setSearch] = useState("Guayana");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showMenu, setShowMenu] = useState(false);
    const [message, setMessage] = useState(''); // Estado para el mensaje
    const [filter, setFilter] = useState({ type: '', value: '' });

    const getHistorico = async (page, search = 'Guayana', filter) => {
        try {
            console.log('Fetching with filter:', filter); // Log para verificar los filtros
            const res = await getHistoricoRequest(page, search, filter);
            if (res && res.data) {
                console.log('Response data:', res.data);
                setHistorico(res.data.items);
                setTotalPages(res.data.totalPages); 
                if (res.data.items.length === 0) {
                    setMessage('No existe esa localidad o No hay Valores para mostrar'); // Actualizar el mensaje si no hay resultados
                } else {
                    setMessage('');
                }
            }
        } catch (error) {
            console.log('Error fetching historico:', error);
        }
    }

    useEffect(() => {
        getHistorico(page, search, filter); // Incluir el filtro en la llamada
    }, [page, search, filter]); // Dependencias actualizadas

    // buscador
    const searcher = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const toggleMenu = (event) => {
        event.preventDefault();
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event) => {
        if (showMenu && !event.target.closest('.filter')) {
            setPage(1);
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
            message,
            filter, // Incluir el mensaje en el contexto
            // Métodos
            searcher,
            getHistorico,
            setPage,
            toggleMenu,
            handleClickOutside,
            setFilter
        }}>
            {children}
        </HistoricoContext.Provider>
    );
}
