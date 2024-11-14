/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import {  useUser } from "../../context";
import { useForm } from "react-hook-form"
import Logo from "../../assets/masisa-logo.png";


  


export const EditUser = ({id, onClose}) => {


  const {getOneUsers,  updateUsers} =  useUser();
  const { register, handleSubmit, setValue, formState: { errors }} = useForm();
  const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            if (id) {
              const user = await getOneUsers(id);
              setValue('name', user.name);
              setValue('email', user.email);
              setValue('password', user.password);
              setValue('confirmPassword', user.password);
          }
        };
          loadUser();
    }, []);
    
    const onSubmit = async (data) => {
        try {
          if (id) {
            updateUsers(id, {
              ...data });
              if(parseFloat(data.password) === parseFloat(data.confirmPassword)){
                 return alert('La contraseñas no coinciden');}
              alert('actualizado');
              onClose();
              navigate('/users');


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
                    <h2>Nuevo Usuario</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="localidad-name">
                        <label>Nombre del Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingrese nombre del usuario"
                            {...register('name')}
                        />


                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Ingrese email del usuario"
                            {...register('email')}
                        />

                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese la contraseña"
                            {...register('password')}
                        />

                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirme la contraseña"
                            {...register('confirmPassword')}
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
    </>
  
  )
}