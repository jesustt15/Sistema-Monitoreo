/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";
import {createLugarRequest, updateLugarRequest, deleteLugarRequest, getLugarRequest, getOneLugarRequest} from '../api'


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

    const updateLugar = async(id, lugar) =>{
        try {
            await updateLugarRequest(id, lugar);
          } catch (error) {
            console.error(error);
          }
    }

    const deleteLugar = async(id) => {

        try {
            const res = await deleteLugarRequest(id);
            console.log("haciendo la verificacion");
            if (res.status === 204) setlugares(lugares.filter((lugar) => lugar._id !== id));
          } catch (error) {
            console.log(error);
          }
    }

    const getOneLugar = async(id) =>{

        try {

            const res = await getOneLugarRequest(id);
            setlugares(res.data);
            
        } catch (error) {
            console.log(error);
            
        }

    }



    return (
        <LugarContext.Provider value={{ lugares , 
        createLugar,
        getLugares,
        deleteLugar,
        updateLugar,
        getOneLugar
        }}>
            {children}
        </LugarContext.Provider>
    )
}
