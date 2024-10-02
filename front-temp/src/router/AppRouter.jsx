
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { Historico } from '../historico/Historico';
import { ActualizarLugar, Lugares, NewLugar } from '../lugares';
import { ConfigProvider, HistoricoProvider, LugarProvider } from '../context';
import { ValorProvider } from '../context/ValorContext';
import { ProtectedRoute } from './private';




export const AppRouter = () => {


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
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/" /> } />
                            < Route element={ <ProtectedRoute />}>
                                <Route path="/" element={ <Home /> } />
                                <Route path="/*" element={ <Navigate to="/" /> } />
                                <Route path="/config" element={ <Config /> } />
                                <Route path='/lugares' element ={ <Lugares />} />
                                    <Route path='/lugares/:id' element ={ <ActualizarLugar />} />
                                    <Route path='/new-lugar' element ={ <NewLugar />} />
                                <Route path='/historico' element={<Historico />}/>
                            </Route>
                        </Routes>
                    </ConfigProvider>
                </HistoricoProvider>
            </ValorProvider>
        </LugarProvider>

    )
}