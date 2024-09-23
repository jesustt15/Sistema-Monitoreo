import { useForm } from "../../hooks"
import Navbar from "../components/NavBar"

const configFormField = {
    lugarConfig: '',
    tempMinConfig: '',
    tempMaxConfig: '',
    humMinConfig: '',
    humMaxConfig: '',

};



export const Config = () => {

    const {lugarConfig, tempMinConfig, tempMaxConfig, humMinConfig, humMaxConfig, onInputChange:onConfigChange} = useForm(configFormField);

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/sensor/config', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({lugar: lugarConfig, tempMin: tempMinConfig , tempMax: tempMaxConfig, humMin: humMinConfig, humMax: humMaxConfig })
          });
          if (response.ok) {
            console.log('Datos enviados con éxito');
          } else {
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <>
        <Navbar />
        <p>Config</p>
        <form onSubmit={onHandleSubmit}>
            <div>
                <input
                type="text"
                placeholder="Lugar"
                name="lugarConfig"
                value={lugarConfig}
                onChange={onConfigChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Temp Minima"
                name="tempMinConfig"
                value={tempMinConfig}
                onChange={onConfigChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Temp Max"
                name="tempMaxConfig"
                value={tempMaxConfig}
                onChange={onConfigChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Humedad Max"
                name="humMaxConfig"
                value={humMaxConfig}
                onChange={onConfigChange}
                ></input>
            </div>
            <div>
                <input
                type="number"
                placeholder="Humedad Min"
                name="humMinConfig"
                value={humMinConfig}
                onChange={onConfigChange}
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