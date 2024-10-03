


import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../../components/Loading';




export const LoginPage = () => {

    const { signin, errorMessage, isAuthenticated, loading, setLoading } = useAuth();
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const loginSubmit = async( data ) => {
       setLoading(true);
        try {
         signin(data );
       } catch (error) {
        console.log(error);
       } finally{
        setLoading(false);
       }
       
        

    }
    
    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
        if (isAuthenticated) {
          navigate("/config");
        }
      }, [isAuthenticated]);
  

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    {loading && <Loading />}
                    <h3>Ingreso</h3>
                    <form onSubmit= {handleSubmit(loginSubmit)}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                name='email'
                                placeholder="Correo"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                {...register("password", { required: true })}
                            />
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                </div>
            </div>
    )
}