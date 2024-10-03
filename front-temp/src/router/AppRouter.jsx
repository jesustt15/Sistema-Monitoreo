
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { Historico } from '../historico/Historico';
import { ActualizarLugar, Lugares, NewLugar } from '../lugares';
import {  ConfigProvider, HistoricoProvider, LugarProvider, useAuth } from '../context';
import { ValorProvider } from '../context/ValorContext';
import { Loading } from '../components/Loading';






export const AppRouter = () => {

    const {user} = useAuth();




    // useEffect(() => {
    //     checkAuthToken();
    // }, [])

    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
   




    return (
        
                <LugarProvider>
                    <ValorProvider>
                        <HistoricoProvider>
                            <ConfigProvider>
                                <Routes>
                                    {
                                         (!user) ? (
                                            <>
                                                <Route path="/auth/*" element={ <LoginPage /> } />
                                                <Route path="/*" element={ <Navigate to="/auth/" /> } />
                                            </>


                                         ) :
                                          (
                                            <>
                                                <Route path="/" element={ <Home /> } />
                                                <Route path="/*" element={ <Navigate to="/" /> } />
                                                <Route path="/config" element={ <Config /> } />
                                                <Route path='/lugares' element ={ <Lugares />} />
                                                <Route path='/historico' element ={ <Historico />} />
                                                    <Route path='/lugares/:id' element ={ <ActualizarLugar />} />
                                                    <Route path='/new-lugar' element ={ <NewLugar />} />
                                            </>
                                          )
                                    }

                                </Routes>
                            </ConfigProvider>
                        </HistoricoProvider>
                    </ValorProvider>
            </LugarProvider>
        
    )
}