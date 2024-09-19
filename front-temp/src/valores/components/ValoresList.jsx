import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensorData } from '../../store';
import Navbar from './NavBar';
import './components.css';
import { Loading } from './Loading';


export const ValoresList = () => {
    const dispatch = useDispatch();
    const valuesData = useSelector((state) => state.valores.data);
    const valuesStatus = useSelector((state) => state.valores.status);
    const error = useSelector((state) => state.valores.error);

    useEffect(() => {
        if (valuesStatus === 'idle') {
          dispatch(fetchSensorData());
        }
      }, [valuesStatus, dispatch]);
    
      if (valuesStatus === 'loading') {
        return <Loading />;
      }
    
      if (valuesStatus === 'failed') {
        return <div>Error: {error}</div>;
      }



  return (
    <>
          <Navbar />
    
    
    
        <ul>
            {valuesData.map((data) => (
            <li key={data.ids}>
                ID: {data.id}, Temperature: {data.tempValue}, Humidity: {data.humValue}
            </li>
            ))}
      </ul> 
    </>


  )
}
