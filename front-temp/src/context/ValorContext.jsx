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
  
  
    const getValores = async() =>{

        const res = await getValoresRequest();
        setValores(res.data);           
  }

    //buscador
  
    const searcher = (e) => {
      setSearch(e.target.value);
      console.log(e.target.value);
    }
  
    // metodo filtrado
    let results = [];
  
    if(!search){
      results = valores;
    }else {
      results =  valores.filter((dato) => dato.lugar.name.includes(search))
    }





    return (
        <ValorContext.Provider value={{ results , 
        getValores,
        searcher}}>
            {children}
        </ValorContext.Provider>
    )
}
