
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthProvider } from './context';




export const SensorApp = () => {
      
      
      return(

        <BrowserRouter>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
                    
              </BrowserRouter>

      )
}