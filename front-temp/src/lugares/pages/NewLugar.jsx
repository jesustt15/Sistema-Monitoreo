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

    const onHandleSubmit = async (data) => {
        if (parseFloat(data.tempMin) > parseFloat(data.tempMax) || parseFloat(data.humMin) > parseFloat(data.humMax)) {
            alert('Los valores mínimos no pueden ser mayores a los máximos');
        } else {
            await createLugar({ ...data });
            alert('Datos agregados');
            onClose();
            navigate('/lugares');
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
                            {...register('name', { required: true })}
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
                                        {...register('tempMin', { required: true })}
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
                                    {...register('tempMax', { required: true })}
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
                                            {...register('humMin', { required: true })}
                                        />
                            </div>

                                <div className="group-content">
                                    <label className="max">Máxima
                                        <i className="bi bi-droplet-fill"></i>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Humedad Máx"
                                        {...register('humMax', { required: true })}
                                    />
                                </div>
                            </div>
                                

                    </div>
                    {errors.tempMax || errors.humMax && <span>Este campo es requerido</span>}
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
