/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState} from "react";
import {  loginRequest, verifyTokenRequest } from "../api";
import Cookies from "js-cookie";

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
    const [loading, setLoading] = useState(true);



    const signin = async (user) => {
      try {
        
        const res = await loginRequest(user);
        setUser(res.data);
        Cookies.set('token', res.data.token);
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
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      }

      useEffect(() => {
        const checkLogin = async () => {
          const token = Cookies.get('token');
          if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(token);
            console.log(res);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            console.log(error);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);



    return (
        <AuthContext.Provider value={{ signin, user,
            logout, isAuthenticated, errorMessage, loading

        }}>
            {children}
        </AuthContext.Provider>
    )
}