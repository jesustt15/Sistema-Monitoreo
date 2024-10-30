/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { getValoresByPaginationRequest } from '../api';

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
    const [search, setSearch] = useState("Guayana");
    const [showMenu, setShowMenu] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleClickOutside = (event) => {
        if (showMenu && !event.target.closest('.filter')) {
            setPage(1);
            setShowMenu(false);
        }
    };

    const getValoresByPagination = async () => {
        const res = await getValoresByPaginationRequest(page, search);
        setValores(res.data.items);
        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        getValoresByPagination();
    }, [page, search]);

    const searcher = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const toggleMenu = (event) => {
        event.preventDefault();
        setShowMenu(!showMenu);
    };

    return (
        <ValorContext.Provider value={{
            valores,
            getValoresByPagination,
            handleClickOutside,
            searcher,
            toggleMenu,
            setPage,
            showMenu,
            page,
            totalPages
        }}>
            {children}
        </ValorContext.Provider>
    );
}

