/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";
import { getValoresRequest} from '../api';


const ValorContext = createContext();

export const useValor = () =>{
    

    const context = useContext(ValorContext);

    if (!context){
        throw new Error('useValor debe estar en el contexto')
    }
     return context;

} 


export function ValorProvider ({children}) {
    const [valores, setValores] = useState([]);
    const [search, setSearch] = useState("Guayana");
    const [showMenu, setShowMenu] = useState(false);
    const [activeChart, setActiveChart] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.filter')) {
          setPage(1);
          setShowMenu(false);
      }
  };
  
  
    const getValores = async() =>{

        const res = await getValoresRequest(page);
        setValores(res.data.items);  
        setTotalPages(res.data.totalPages);         
  }

    //buscador
  
    const searcher = (e) => {
      setSearch(e.target.value);
    }
  
    // metodo filtrado
    let results = [];
  
    if(!search){
      results = valores;
    }else {
      results =  valores.filter((dato) =>  dato.lugare.name.includes(search))
    }

    const toggleMenu = (event) => {
      event.preventDefault();
      setShowMenu(!showMenu);
      
  };




    return (
        <ValorContext.Provider value={{ results ,  valores,
        getValores,
        handleClickOutside,
        setActiveChart,
        searcher,
        toggleMenu,
        setPage,
        showMenu,
        page
        , totalPages,
        activeChart
        }}>
            {children}
        </ValorContext.Provider>
    )
}
