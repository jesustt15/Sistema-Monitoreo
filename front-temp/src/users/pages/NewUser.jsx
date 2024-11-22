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

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const validatePassword = (value) => {
        return value === password || "Las contraseñas no coinciden";
    };

    const onHandleSubmit = async (data) => {
        try {
            await createUsers({ ...data });
            alert('Datos agregados');
            onClose();
            navigate('/users');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            if (error.message === 'User with this email already exists.') {
                alert('Ya existe un usuario con este correo electrónico.');
            } else {
                alert('Hubo un error al crear el usuario');
            }
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
                            {...register('name', { required: "Este campo es obligatorio" })}
                        />
                        {errors.name && <span>{errors.name.message}</span>}

                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Ingrese email del usuario"
                            {...register('email', { required: "Este campo es obligatorio" })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}

                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese la contraseña"
                            {...register('password', { required: "Este campo es obligatorio" })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirme la contraseña"
                            {...register('confirmPassword', {
                                required: "Este campo es obligatorio",
                                validate: validatePassword
                            })}
                        />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
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
