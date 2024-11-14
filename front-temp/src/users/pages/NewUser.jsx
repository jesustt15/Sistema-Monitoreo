/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import '../../index.scss';
import { useUser } from "../../context";
import { useForm } from "react-hook-form";
import Logo from "../../assets/masisa-logo.png";

export const NewUser = ({ onClose }) => {
    const { handleSubmit, register, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { createUsers } = useUser();
    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    const confirmPasword = watch('confirmPassword');

    const onHandleSubmit = async (data) => {
        if (parseFloat(data.password) === parseFloat(data.confirmPasword)) {
            alert('Las contraseñas no coinciden');
        } else {
            await createUsers({ ...data });
            alert('Datos agregados');
            onClose();
            navigate('/users');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="header">
                    <img src={Logo} alt="masisa-logo" />
                    <h2>Nuevo Usuario</h2>
                </div>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="localidad-name">
                        <label>Nombre del Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingrese nombre del usuario"
                            {...register('name', { required: true })}
                        />


                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Ingrese email del usuario"
                            {...register('email', { required: true })}
                        />

                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese la contraseña"
                            {...register('password', { required: true })}
                        />

                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirme la contraseña"
                            {...register('confirmPassword', { required: true })}
                        />
                    </div>
                    {errors.password && <span>Este campo es requerido</span>}
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
