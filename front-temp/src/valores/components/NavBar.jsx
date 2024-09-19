import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { filterData } from '../../store/valores';




const Navbar = () => {

  const dispatch = useDispatch();


  const handleFilterChange = (e) =>{
      const { value } = e.target;
      dispatch(filterData(value));
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Inicio</Link>
      </div>
      <div className="navbar-links">
        <select onChange={handleFilterChange}>
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="id">ID</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
