import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { Historico } from '../historico/Historico';
import { ActualizarLugar, Lugares, NewLugar } from '../lugares';
import { HistoricoProvider, LugarProvider } from '../context';
import { ValorProvider } from '../context/ValorContext';
import { useAuth } from '../context/AuthContext';



export const AppRouter = () => {

    const {checkAuthToken , isAuthenticated} = useAuth(); 
    
    useEffect(() => {
        checkAuthToken();
    }, [])

    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <LugarProvider>
            <ValorProvider>
                <HistoricoProvider>
                    <Routes>
                        {
                            ( !isAuthenticated )  
                                ? (
                                    <>
                                        <Route path="/auth/*" element={ <LoginPage /> } />
                                        <Route path="/*" element={ <Navigate to="/auth/" /> } />
                                    </>
                                )
                                : (
                                    <>
                                        <Route path="/" element={ <Home /> } />
                                        <Route path="/*" element={ <Navigate to="/" /> } />
                                        <Route path="/config" element={ <Config /> } />
                                        <Route path='/lugares' element ={ <Lugares />} />
                                            <Route path='/lugares/:id' element ={ <ActualizarLugar />} />
                                            <Route path='/new-lugar' element ={ <NewLugar />} />
                                        <Route path='/historico' element={<Historico />}/>
                                    </>
                                ) 
                        }
                    </Routes>
                </HistoricoProvider>
            </ValorProvider>
        </LugarProvider>

    )
}