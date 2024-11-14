
import {   Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { Historico } from '../historico/Historico';
import { ActualizarLugar, Lugares, NewLugar } from '../lugares';
import {  ConfigProvider, HistoricoProvider, LugarProvider } from '../context';
import { ValorProvider } from '../context/ValorContext';
import { RutaProtegida } from './RutaProtegida';








export const AppRouter = () => {



    return (
        
        <LugarProvider>
            <ValorProvider>
                <HistoricoProvider>
                    <ConfigProvider>
                            <Routes>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route element={<RutaProtegida />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/config" element={<Config />} />
                                <Route path="/lugares" element={<Lugares />} />
                                <Route path="/historico" element={<Historico />} />
                                <Route path="/lugares/:id" element={<ActualizarLugar />} />
                                <Route path="/new-lugar" element={<NewLugar />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/auth/" />} />
                            </Routes>
                    </ConfigProvider>
                </HistoricoProvider>
            </ValorProvider>
        </LugarProvider>
        
    )
}





