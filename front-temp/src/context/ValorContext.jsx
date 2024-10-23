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



    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.filter')) {
          setShowMenu(false);
      }
  };
  
  
    const getValores = async() =>{

        const res = await getValoresRequest();
        setValores(res.data);           
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
        searcher,
        toggleMenu,
        showMenu,
        
        }}>
            {children}
        </ValorContext.Provider>
    )
}
