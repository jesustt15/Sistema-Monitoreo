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


export function ConfigProvider ({children}) {
    const [config, setConfig] = useState([]);

    // const createConfig = async(Configes) => {

    //     const res = await createConfigRequest(Configes);
    //     console.log(res);


    // }
    // const getConfiges = async() =>{

    //       const res = await getConfigRequest();
    //       setConfiges(res.data);           
    // }

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
            console.log(res.data);
            setConfig(res.data);
            
        } catch (error) {
            console.log(error);
            
        }

    }


    return (
        <ConfigContext.Provider value={{ config , 

        updateConfig,
        getConfig
        }}>
            {children}
        </ConfigContext.Provider>
    )
}
