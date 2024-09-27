

import { useForm } from '../../hooks';
import { useAuth } from '../../context/AuthContext';


const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}


export const LoginPage = () => {

    const { signin, errorMessage } = useAuth();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
  

    const loginSubmit = ( event ) => {
        event.preventDefault();
        signin({ email: loginEmail, password: loginPassword });
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
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
