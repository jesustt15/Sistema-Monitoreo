


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
                
                
                
                <div className="full-container">
                    <div className="info-container">
                        <div className="img-logo">
                            <img src={Logo} alt="loguito" />
                        </div>
                        <div className="form-container">
                            <h2>Inicio de Sesión</h2>
                            <form onSubmit= {handleSubmit(loginSubmit)}>
                                <span>Correo eléctronico</span>
                                <input 
                                            type="text"
                                            className="form-control"
                                            name='email'
                                            placeholder="Ingresa tu correo electrónico"
                                            {...register("email", { required: true })}
                                        />
                                
                                <span>Contraseña</span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ingresa tu contraseña"
                                        name='password'
                                        {...register("password", { required: true })}
                                    />
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <div className="btn-submit">
                                    <input 
                                        type="submit"
                                        className="btnSubmit"
                                        value="Inicia Sesion" 
                                    />
                                </div>
                            </form>

                        </div>
                    </div>
                    
                    <img src={Fabrica} alt="masisa-fabrica" />

                </div>
                // <div>
                //     {loading && <Loading />}
                //     <h3>Ingreso</h3>

                // </div>
    )
}