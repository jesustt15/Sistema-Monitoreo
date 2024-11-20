/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import '../../index.scss';
import { useLugar } from "../../context";
import { useForm } from "react-hook-form";
import Logo from "../../assets/masisa-logo.png";

export const NewLugar = ({ onClose }) => {
    const { handleSubmit, register, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { createLugar } = useLugar();

    const tempMin = watch('tempMin');
    const tempMax = watch('tempMax');
    const humMin = watch('humMin');
    const humMax = watch('humMax');

    const validateValues = (data) => {
        if (parseFloat(data.tempMin) >= parseFloat(data.tempMax)) {
            return "La temperatura mínima no puede ser mayor o igual a la máxima.";
        }
        if (parseFloat(data.humMin) >= parseFloat(data.humMax)) {
            return "La humedad mínima no puede ser mayor o igual a la máxima.";
        }
        return null;
    };

    const onHandleSubmit = async (data) => {      
        const validationError = validateValues(data);
        if (validationError) {
            alert(validationError);
        } else {
            try {
                await createLugar({ ...data });
                alert('Datos agregados');
                onClose();
                navigate('/lugares');
            } catch (error) {
                console.error('Error al crear la localidad:', error);
                alert('Hubo un error al crear la localidad');
            }
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="header">
                    <img src={Logo} alt="masisa-logo" />
                    <h2>Nueva Localidad</h2>
                </div>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="localidad-name">
                        <label>Nombre de la Localidad</label>
                        <input
                            type="text"
                            placeholder="Ingrese nombre de la localidad"
                            {...register('name', { required: "Este campo es obligatorio" })}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
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
                                        {...register('tempMin', {  required: "Este campo es obligatorio" })}
                                    />
                                    {errors.tempMin && <span>{errors.tempMin.message}</span>}
                                </div>
                            </div>
                           
                            <div className="group-content">
                                <label className="max">Máxima
                                         <i className="bi bi-thermometer-high"></i>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Temperatura Máx"
                                    {...register('tempMax', { required: "Este campo es obligatorio" })}
                                />
                                {errors.tempMax && <span>{errors.tempMax.message}</span>}
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
                                        {...register('humMin', { required: "Este campo es obligatorio" })}
                                    />
                                    {errors.humMin && <span>{errors.humMin.message}</span>}
                            </div>
                            <div className="group-content">
                                    <label className="max">Máxima
                                        <i className="bi bi-droplet-fill"></i>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Humedad Máx"
                                        {...register('humMax', { required: "Este campo es obligatorio" })}
                                    />
                                    {errors.humMax && <span>{errors.humMax.message}</span>}
                                </div>
                            </div>      
                    </div>
                    <input
                        className="btn-submit"
                        type="submit"
                        value="Agregar"
                    />
                </form>
            </div>
        </div>
    );
};

