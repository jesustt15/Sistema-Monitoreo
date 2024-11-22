/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";
import { getConfigRequest, updateConfigRequest } from '../api'


const ConfigContext = createContext();

export const useConfig = () =>{
    

    const context = useContext(ConfigContext);

    if (!context){
        throw new Error('useConfig debe estar en el contexto')
    }
     return context;

} 


// eslint-disable-next-line react/prop-types
export function ConfigProvider ({children}) {
    const [config, setConfig] = useState([]);


    const updateConfig = async( config) =>{
        try {
            await updateConfigRequest( config);
          } catch (error) {
            console.error(error);
          }
    }

    const getConfig = async() =>{

        try {

            const res = await getConfigRequest();
            return res.data;
            
        } catch (error) {
            console.log(error);
            
        }

    }


    return (
        <ConfigContext.Provider value={{ config , 

            setConfig,

        updateConfig,
        getConfig
        }}>
            {children}
        </ConfigContext.Provider>
    )
}
