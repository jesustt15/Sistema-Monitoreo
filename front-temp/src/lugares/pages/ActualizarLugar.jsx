import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLugar } from "../../context";
import { useForm } from "../../hooks";




export const ActualizarLugar = () => {

  const { id } = useParams();
  const {updateName, updateTempMin, updateTempMax, updateHumMax, updateHumMin,  onInputChange} = useForm(formUpdateField);
  const {getOneLugar, lugares} =  useLugar();

  const formUpdateField = {

    updateName: lugares.name,
    updateTempMin: '',
    updateTempMax: '',
    updateHumMax: '',
    updateHumMin: '',
  }
  

  useEffect(() => {
    if (id) {
     getOneLugar();
            
    }
}, []);

const updateSubmit = () => {

  console.log('enviando');
}
  
return (
    <>
      <div>Actualizar Lugar</div>
                    <form onSubmit={ updateSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name="updateName"
                                value={ updateName}
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Contraseña"
                                name="updateTempMin"
                                value={ updateTempMin }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Contraseña"
                                name="updateTempMax"
                                value={ updateTempMax }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Contraseña"
                                name="updateHumMin"
                                value={ updateHumMin }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Contraseña"
                                name="updateHumMax"
                                value={ updateHumMax }
                                onChange={ onInputChange }
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
    </>
  
  )
}
