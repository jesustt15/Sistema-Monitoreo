import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLugar } from "../../context";
import { useForm } from "react-hook-form"
import Navbar from "../../components/NavBar";


  


export const ActualizarLugar = () => {

  const { id } = useParams();  
  const {getOneLugar,  updateLugar} =  useLugar();
  const { register, handleSubmit, setValue} = useForm();
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
              navigate('/lugares')
          } else {
            alert('No hay nada que actualizar')
          }
        } catch (error) {
            console.log(error);
            // window.location.href = "/";
          }
 }
    

 const onBack = () => {
    navigate('/lugares');
  }
return (
    <>
    <Navbar />
    <div className="full-container">
        <div className="container">
        <button onClick={onBack}>Atras</button>
            <div>Actualizar Lugar</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="name"
                            {...register("name")}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Temperatura Minima"
                            {...register("tempMin")}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Temperatura Maxima"
                            {...register("tempMax")}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Humedad Minima"
                            {...register("humMin")}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Humedad Maxima"
                            {...register("humMax")}
                        />
                    </div> 
                    {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                        <div className="d-grid gap-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Actualizar" 
                        />
                    </div>
                </form>
        </div>
    </div>
    </>
  
  )
}
