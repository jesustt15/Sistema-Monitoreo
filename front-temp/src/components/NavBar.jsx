import { Link, NavLink } from 'react-router-dom';
import './components.css';
import { useAuth } from '../context/AuthContext';



const Navbar = () => {

  const {logout} = useAuth();

  const handleLogout = () =>{
    logout();
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Valores</Link>
        <NavLink to="/config">Config</NavLink>
        <NavLink to="/lugares">Localidades</NavLink>
        <NavLink to="/historico">Historico</NavLink>
        <button onClick={handleLogout}>Salir</button>
      </div>
    </nav>
  );
};

export default Navbar;