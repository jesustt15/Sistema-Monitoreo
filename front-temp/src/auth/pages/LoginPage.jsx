


import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import Fabrica from '../../assets/masisa-fabrica.png';
import Logo from '../../assets/masisa-logo.png';
import './login.scss';




export const LoginPage = () => {

    const { signin, errorMessage, loading, setLoading } = useAuth();
    const { register, handleSubmit} = useForm();

    // const id = toast.loading("Please wait...")


    const loginSubmit = async( data ) => {
       setLoading(true);
        try {
        
         signin(data );
        //  toast.update(id, { render: "All is good", type: "success", isLoading: false });
       } catch (error) {
        console.log(error);
       } finally{
        setLoading(false);
       }
       

    }
    
    return (    
            <div className="container">
                <div className="left-section">
                    <img src={Logo} alt="Logo" className="logo"/>
                    <div className="login-form">
                        <h2>Inicio de sesión</h2>
                        <form onSubmit= {handleSubmit(loginSubmit)}>
                            <label>Correo electrónico</label>
                            <input  type="text"
                                        className="form-control"
                                        name='email'
                                        placeholder="Ingresa tu correo electrónico"
                                        {...register("email", { required: true })}/>
                        
                            <label>Contraseña</label>
                            <input type="password"
                                        className="form-control"
                                        placeholder="Ingresa tu contraseña"
                                        name='password'
                                        {...register("password", { required: true })}/>
                            
                            <input 
                                        type="submit"
                                        className="btnSubmit"
                                        value="Iniciar Sesion" 
                                    />
                        </form>
                            
                    </div>
                </div>
                <div className="right-section">
                    <img src= {Fabrica} alt="Imagen de Login"/>
                </div>
            </div>
        
            
    )
}