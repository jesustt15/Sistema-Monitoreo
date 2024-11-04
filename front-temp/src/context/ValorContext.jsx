/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { getValoresByPaginationRequest, getValoresRequest } from '../api';

const ValorContext = createContext();

export const useValor = () => {
    const context = useContext(ValorContext);
    if (!context) {
        throw new Error('useValor debe estar en el contexto');
    }
    return context;
}

export function ValorProvider({ children }) {
    const [valores, setValores] = useState([]);
    const [search, setSearch] = useState("Guayana"); // Default search value
    const [showMenu, setShowMenu] = useState(false);
    const [page, setPage] = useState(1);
    const [activeChart, setActiveChart] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState('');

    const handleClickOutside = (event) => {
        if (showMenu && !event.target.closest('.filter')) {
            setPage(1);
            setShowMenu(false);
        }
    };

    const getValores = async (search = 'Guayana' ) => {
        try {
            const res = await getValoresRequest(search);
            setValores(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getValoresByPagination = async(page, search = 'Guayana') => {
        try {
            const res = await getValoresByPaginationRequest(page, search);
            if (res && res.data) {
                setValores(res.data.items);
                setTotalPages(res.data.totalPages);
                if (res.data.items.length === 0) {
                    setMessage('No existe esa localidad'); // Actualizar el mensaje si no hay resultados
                } else {
                    setMessage('');
                }
            }
        } catch (error) {
            console.error('Error fetching paginated values:', error);
        }
    };

    useEffect(() => {
        getValoresByPagination(page, search);
    }, [page, search]);

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(search);
        setPage(1);
    };

    const toggleMenu = (event) => {
        event.preventDefault();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        getValores(search);  // Asegúrate de actualizar los valores cada vez que cambia 'search'
    }, [search]);

    return (
        <ValorContext.Provider value={{
            valores,
            getValoresByPagination,
            setActiveChart,
            getValores,
            handleClickOutside,
            searcher,
            toggleMenu,
            setPage,
            showMenu,
            page,
            totalPages,
            activeChart,
            search ,
            message // Asegúrate de incluir 'search' en el contexto
        }}>
            {children}
        </ValorContext.Provider>
    );
}

