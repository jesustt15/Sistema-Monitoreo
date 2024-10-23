
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

 export const RutaProtegida = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Si no hay usuario, redirige a /auth/
    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Si hay usuario y la ruta contiene /auth/, redirige a la ruta raíz
    if (location.pathname.startsWith('/auth')) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};





