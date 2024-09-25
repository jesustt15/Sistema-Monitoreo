import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { Home  } from '../valores/pages/Home';
import { Config } from '../valores/pages/Config';
import { Lugares } from '../lugares/pages/Lugares';



export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <Home /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            <Route path="/config" element={ <Config /> } />
            <Route path='/lugares' element ={ <Lugares />} />
        </Routes>
    )
}