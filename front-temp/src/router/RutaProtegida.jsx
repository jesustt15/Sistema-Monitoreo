
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

 export const RutaProtegida = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Si no hay usuario, redirige a /auth/
    if (!user) {
        return <Navigate to="/auth/" state={{ from: location }} replace />;
    }

    // Si hay usuario y la ruta contiene /auth/, redirige a la ruta raíz
    if (location.pathname.startsWith('/auth/')) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};





