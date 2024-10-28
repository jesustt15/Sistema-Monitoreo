/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState} from "react";
import {  loginRequest, logoutRequest } from "../api";
import { useNavigate} from 'react-router-dom';


const AuthContext = createContext();

export const useAuth = () =>{
    

    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth debe estar en el contexto')
    }
     return context;

} 


export function AuthProvider ({children}) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name') ;
    const email = localStorage.getItem('email');
    return token ? { token, name, email } : null;
  });
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('name',user.name);
        localStorage.setItem('email',user.email);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        setIsAuthenticated(false);
      }
    }, [user]);


    const signin = async (user) => {
      
      setLoading(true);
      try {
        
        const res = await loginRequest(user);
        setUser({name: res.data.name ,token: res.data.token, email:res.data.email});
        setIsAuthenticated(true);
        console.log(isAuthenticated);
        navigate('/'); 
      } catch (error) {
          
          const errores = error.response.data;
          if('errors' in errores){
             setErrorMessage(error.response.data.errors.msg);
          }
          setErrorMessage(error.response.data.msg);
        }
        finally{
          setLoading(false);
        }
      };


      const logout = async() => {
        try {
           await logoutRequest();
          localStorage.clear();
          setIsAuthenticated(false);
          
        } catch (error) {
          console.log(error);
 
        }
       
      }



    return (
        <AuthContext.Provider value={{ signin, user,
            logout, isAuthenticated, errorMessage, loading, setLoading

        }}>
            {children}
        </AuthContext.Provider>
    )
}