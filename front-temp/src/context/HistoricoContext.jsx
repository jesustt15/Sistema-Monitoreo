/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
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

    const getHistorico = async (page = 1) => {
        const res = await getHistoricoRequest(page);
        console.log(res.data);
        setHistorico(res.data.items);
        setTotalPages(res.totalPages); // Asume que tu respuesta tiene el total de páginas
    }

    // buscador
    const searcher = (e) => {
        setSearch(e.target.value);
    }

    // método filtrado
    let results = [];
    if (!search) {
        results = historico;
    } else {
        results = historico.filter((dato) => dato.valore.lugare.name.includes(search));
    }

    return (
        <HistoricoContext.Provider value={{
            results,
            searcher,
            getHistorico,
            page,
            setPage,
            totalPages
        }}>
            {children}
        </HistoricoContext.Provider>
    )
}
