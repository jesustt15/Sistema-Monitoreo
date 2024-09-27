/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import { checkAuthTokenRequest, loginRequest } from "../api";

const AuthContext = createContext();

export const useAuth = () =>{
    

    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth debe estar en el contexto')
    }
     return context;

} 


export function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const signin = async ({email , password}) => {
        try {
          const {data} = await loginRequest({email , password});
          localStorage.setItem('token', data.token);
          localStorage.setItem('token-init-date', new Date().getTime());
          setUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          
          const errores = error.response.data;
          if('errors' in errores){
             setErrorMessage(error.response.data.errors.msg);
          }
          setErrorMessage(error.response.data.msg);
        }
      };
      const logout = () => {
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        //logout
      }

      const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return  logout();
        try {
            const { data } = await checkAuthTokenRequest();
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
             signin({ name: data.name, uid: data.uid });
        } catch (errorMessage) {
            localStorage.clear();
             logout();
        }
    }
      



    return (
        <AuthContext.Provider value={{ signin,
            logout, checkAuthToken, isAuthenticated, user, errorMessage

        }}>
            {children}
        </AuthContext.Provider>
    )
}