/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useLugar } from "../../context";
import { useForm } from "react-hook-form"
import Logo from "../../assets/masisa-logo.png";


  


export const ActualizarLugar = ({id, onClose}) => {


  const {getOneLugar,  updateLugar} =  useLugar();
  const { register, handleSubmit, setValue, formState: { errors }} = useForm();
  const navigate = useNavigate();

    useEffect(() => {
        const loadLugar = async () => {
            if (id) {
              const lugar = await getOneLugar(id);
              setValue('name', lugar.name);
              setValue('tempMin', lugar.tempMin);
              setValue('tempMax', lugar.tempMax);
              setValue('humMin', lugar.humMin);
              setValue('humMax', lugar.humMax);
          }
        };
          loadLugar();
    }, []);
    
    const onSubmit = async (data) => {
        try {
          if (id) {
            updateLugar(id, {
              ...data });
              if(parseFloat(data.tempMin) > parseFloat(data.tempMax) || parseFloat(data.humMin) > parseFloat(data.humMax)){
                 return alert('Los valores minimos no pueden ser mayores a los maximos');}
              alert('actualizado');
              onClose();
              navigate('/lugares');


          } 
        } catch (error) {
            console.log(error);
            // window.location.href = "/";
          }
 }
    


return (
    <>
            <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="header">
                    <img src={Logo} alt="masisa-logo" />
                    <h2>Editar Localidad</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="localidad-name">
                        <label>Nombre de la Localidad</label>
                        <input
                            type="text"
                            placeholder="Ingrese nombre de la localidad"
                            {...register('name')}
                        />
                    </div>
                    <div className="localidad-values">
                        <h4>Temperatura</h4>
                        <div className="group">
                            <div className="group-content">
                                <label className="min">Minima  
                                    <i className="bi bi-thermometer-snow"></i>
                                </label>
                                <div className="input">
                                    <input
                                        type="number"
                                        placeholder="Temperatura Mín"
                                        {...register('tempMin')}
                                    />
                                </div>
                            </div>
                           
                            <div className="group-content">
                                <label className="max">Máxima
                                         <i className="bi bi-thermometer-high"></i>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Temperatura Máx"
                                    {...register('tempMax')}
                                />
                            </div>

                            
                        </div>
                        <h4>Humedad</h4>
                        <div className="group">

                            <div className="group-content">
                                    <label className="min">Minima  
                                            <i className="bi bi-droplet-half"></i>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Humedad Min"
                                            {...register('humMin')}
                                        />
                            </div>

                                <div className="group-content">
                                    <label className="max">Máxima
                                        <i className="bi bi-droplet-fill"></i>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Humedad Máx"
                                        {...register('humMax')}
                                    />
                                </div>
                            </div>
                                

                    </div>
                    {errors.tempMax || errors.humMax && <span>Este campo es requerido</span>}
                    <input
                        className="btn-submit"
                        type="submit"
                        value="Editar"
                    />
                </form>
            </div>
        </div>
    </>
  
  )
}
