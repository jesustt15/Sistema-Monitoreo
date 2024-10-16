
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthProvider } from './context';
import { ToastContainer} from 'react-toastify';




export const SensorApp = () => {
      
      
      return(

        <BrowserRouter>
              <ToastContainer />
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
                    
              </BrowserRouter>

      )
}