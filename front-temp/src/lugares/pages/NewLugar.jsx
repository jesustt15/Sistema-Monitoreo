

import Navbar from "../../components/NavBar";
import { useLugar } from "../../context";
import { useForm } from "../../hooks"


const lugarFormField = {
    lugarConfig: '',
    tempMinConfig: '',
    tempMaxConfig: '',
    humMinConfig: '',
    humMaxConfig: '',

};


export const NewLugar = () => {

    const {lugarConfig, tempMinConfig, tempMaxConfig, humMinConfig, humMaxConfig, onInputChange:onLugaresChange} = useForm( lugarFormField );
    
    const {createLugar} = useLugar();
    
    const onHandleSubmit =  async(e) => {
        e.preventDefault();
      createLugar({name: lugarConfig, tempMin: tempMinConfig, tempMax: tempMaxConfig, 
        humMin: humMinConfig, humMax: humMaxConfig}); 
       
      };

  return (
    <>
        <Navbar />
        <h2>Nuevo Lugar</h2>
        <form onSubmit={onHandleSubmit}>
            <div>
                <input
                type="text"
                placeholder="Lugar"
                name="lugarConfig"
                value={lugarConfig}
                onChange={onLugaresChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Temp Minima"
                name="tempMinConfig"
                value={tempMinConfig}
                onChange={onLugaresChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Temp Max"
                name="tempMaxConfig"
                value={tempMaxConfig}
                onChange={onLugaresChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Humedad Max"
                name="humMaxConfig"
                value={humMaxConfig}
                onChange={onLugaresChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Humedad Min"
                name="humMinConfig"
                value={humMinConfig}
                onChange={onLugaresChange}
                ></input>
            </div>
            <input
            type="submit"
            value="Guardar"
            ></input>
        </form>
    </>
  )
}
