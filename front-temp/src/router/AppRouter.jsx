import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { ActualizarLugar, Lugares, NewLugar } from '../lugares';
import { HistoricoProvider, LugarProvider } from '../context';
import { ValorProvider } from '../context/ValorContext';
import Navbar from '../components/NavBar';



export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <LugarProvider>
            <ValorProvider>
                <HistoricoProvider>
                <Navbar />
                    <Routes>
                        {
                            ( authStatus === 'not-authenticated')  
                                ? <Route path="/auth/*" element={ <LoginPage /> } />
                                : <Route path="/*" element={ <Home /> } />
                        }

                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        <Route path="/config" element={ <Config /> } />
                        <Route path='/lugares' element ={ <Lugares />} />
                            <Route path='/lugares/:id' element ={ <ActualizarLugar />} />
                            <Route path='/new-lugar' element ={ <NewLugar />} />
                    </Routes>

                </HistoricoProvider>
            </ValorProvider>
        </LugarProvider>

    )
}