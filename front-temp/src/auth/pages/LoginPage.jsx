


import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Loading } from '../../components/Loading';
import { toast } from 'react-toastify';




export const LoginPage = () => {

    const { signin, errorMessage, loading, setLoading } = useAuth();
    const { register, handleSubmit} = useForm();

    const id = toast.loading("Please wait...")


    const loginSubmit = async( data ) => {
       setLoading(true);
        try {
        
         signin(data );
         toast.update(id, { render: "All is good", type: "success", isLoading: false });
       } catch (error) {
        console.log(error);
       } finally{
        setLoading(false);
       }
       

    }
    
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