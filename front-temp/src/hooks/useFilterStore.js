
import { useSelector, useDispatch } from 'react-redux';
import { setFiltro } from '../store';
import axios from 'axios';

const useFilterStore = () => {
  const dispatch = useDispatch();
  const valuesData = useSelector((state) => state.valores.data);
  const  isFiltered  = useSelector((state) => state.filtro);

  const filtrarDatos = async () => {
    let filteredData = valuesData;
    if (isFiltered) {
      const response = await axios.get(`http://localhost:3000/sensor/valores/filtrados?filtro=${isFiltered}`);
      filteredData = response.data;
    }
    return filteredData;
  };
  const cambiarFiltro = (nuevoFiltro) => {
    dispatch(setFiltro(nuevoFiltro));
  };

  return { datosFiltrados: filtrarDatos(), cambiarFiltro };
};

export default useFilterStore;
