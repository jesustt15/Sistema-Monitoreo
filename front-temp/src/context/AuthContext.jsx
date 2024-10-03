/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState} from "react";
import {  loginRequest } from "../api";


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
    return token ? {token }: null;
  });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (user) {
        localStorage.setItem('token', user.token);
      } else {
        localStorage.removeItem('token');
      }
    }, [user]);


    const signin = async (user) => {
      try {
        
        const res = await loginRequest(user);
        setUser({name: res.data.name ,token: res.data.token});
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
        setUser(null);
      }



    return (
        <AuthContext.Provider value={{ signin, user,
            logout, isAuthenticated, errorMessage, loading

        }}>
            {children}
        </AuthContext.Provider>
    )
}