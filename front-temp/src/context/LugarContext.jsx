/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";
import {createLugarRequest, updateLugarRequest, deleteLugarRequest, getLugarRequest} from '../api'


const LugarContext = createContext();

export const useLugar = () =>{
    

    const context = useContext(LugarContext);

    if (!context){
        throw new Error('useLugar debe estar en el contexto')
    }
     return context;

} 


export function LugarProvider ({children}) {
    const [lugares, setlugares] = useState([]);

    const createLugar = async(lugares) => {

        const res = await createLugarRequest(lugares);
        console.log(res);


    }
    const getLugares = async() =>{

          const res = await getLugarRequest();
          setlugares(res.data);           
    }

    const updateLugar = async() =>{

        const res = await updateLugarRequest();
        //todo
    }

    const deleteLugar = async() => {

        const res = await deleteLugarRequest;
        //todo
    }



    return (
        <LugarContext.Provider value={{ lugares , 
        createLugar,
        getLugares,
        deleteLugar,
        updateLugar}}>
            {children}
        </LugarContext.Provider>
    )
}
