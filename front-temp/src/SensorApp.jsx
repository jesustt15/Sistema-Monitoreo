import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';


export const SensorApp = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>

  )
}