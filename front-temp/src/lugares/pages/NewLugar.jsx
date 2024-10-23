/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import '../../index.scss';
import { useLugar } from "../../context";
import { useForm } from "react-hook-form"




export const NewLugar = () => {

    const {handleSubmit, register, watch, formState: {
        errors
    }} = useForm(  );
    const navigate = useNavigate();
    
    const {createLugar} = useLugar();
    const tempMin = watch('tempMin');
    const tempMax = watch('tempMax');
    const humMin = watch('humMin');
    const humMax = watch('humMax');

    const onHandleSubmit =  async(data) => {
        if(parseFloat(data.tempMin) > parseFloat(data.tempMax) || parseFloat(data.humMin) > parseFloat(data.humMax)){
            alert('Los valores minimos no pueden ser mayores a los maximos');
        } else{
            createLugar({...data});
            alert('Datos agregados');
            navigate('/lugares');
        }
  
       
      };

  return (
    <>
        <Navbar />
        <div className="full-container">
            <div className="container">
                <h2>Nuevo Lugar</h2>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div>
                            <input
                            type="text"
                            placeholder="Lugar"
                            {...register('name',{ required: true}) }
                            ></input>
                        </div>
                        <div>
                            <input
                            type="number"
                            placeholder="Temp Minima"
                            {...register('tempMin',{ required: true}) }
                            ></input>
                        </div>
                        <div>
                            <input
                            type="number"
                            placeholder="Temp Max"
                            {...register('tempMax',{ required: true}) }
                            ></input>
                        </div>
                        <div>
                            <input
                            type="number"
                            placeholder="Humedad Min"
                            {...register('humMin',{ required: true}) }
                            ></input>
                        </div>
                        <div>
                            <input
                            type="number"
                            placeholder="Humedad Max"
                            {...register('humMax',{ required: true}) }
                            ></input>
                        </div>
                        {errors.tempMax || errors.humMax && <span>Este campo es requerido</span>}
                        <input
                        type="submit"
                        value="Guardar"
                        ></input>
                </form>
            </div>
        </div>
        
    </>
  )
}
