import { createContext, useContext, useState} from "react";
import { getHistoricoRequest} from '../api';


const HistoricoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useHistorico = () =>{
    

    const context = useContext(HistoricoContext);

    if (!context){
        throw new Error('useHistorico debe estar en el contexto')
    }
     return context;

} 


export function HistoricoProvider ({children}) {
    const [historico, setHistorico] = useState([]);
    const [search, setSearch] = useState("Guayana");
  
  
    const getHistorico = async() =>{

        const res = await getHistoricoRequest();
        setHistorico(res.data);           
  }

   // buscador
  
    const searcher = (e) => {
      setSearch(e.target.value);
    }
  
    // metodo filtrado
    let results = [];
  
    if(!search){
      results = historico;
    }else {
      results =  historico.filter((dato) => dato.value_id.lugar.name.includes(search))
    }





    return (
        <HistoricoContext.Provider value={{ results , 
          searcher,
        getHistorico,}}>
            {children}
        </HistoricoContext.Provider>
    )
}